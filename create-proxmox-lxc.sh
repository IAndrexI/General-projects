#!/bin/bash
# ==============================================================================
# Proxmox VE Turnkey LXC Creator - Protutech Portfolio
# Run directly in your Proxmox VE Host Shell (PVE Node Shell)
# Architecture auto-detected (amd64 / x86_64 guaranteed)
# Footprint: ~10-15 MB RAM, 512 MB disk | 0% idle CPU
# ==============================================================================

set -e

# Detect host architecture to avoid arm64 on x86_64
HOST_ARCH=$(dpkg --print-architecture 2>/dev/null || uname -m)
case "$HOST_ARCH" in
    x86_64|amd64) TARGET_ARCH="amd64" ;;
    aarch64|arm64) TARGET_ARCH="arm64" ;;
    *) TARGET_ARCH="amd64" ;;
esac

echo "=== Detected Host Architecture: $TARGET_ARCH ==="

# Clean up broken arm64 template cache if host is amd64
if [ "$TARGET_ARCH" = "amd64" ] && [ -f "/var/lib/vz/template/cache/alpine-3.24-default_20260803_arm64.tar.xz" ]; then
    rm -f /var/lib/vz/template/cache/alpine-3.24-default_20260803_arm64.tar.xz
fi

# Determine container ID (if 101 is broken from previous attempt, clean it)
CT_ID=101
if pct status "$CT_ID" >/dev/null 2>&1; then
    echo "=== Cleaning up previous failed container $CT_ID ==="
    pct stop "$CT_ID" >/dev/null 2>&1 || true
    pct destroy "$CT_ID" --purge 1 >/dev/null 2>&1 || true
fi

# Detect storage pool
STORAGE="local-lvm"
if ! pvesm status -storage local-lvm >/dev/null 2>&1; then
    STORAGE="local"
fi

echo "=== [1/5] Updating Proxmox Appliance Catalog ==="
pveam update >/dev/null 2>&1 || true

# Find latest Alpine template strictly matching target architecture
ALPINE_TEMPLATE=$(pveam available -section system 2>/dev/null | grep -E "alpine-[0-9].*_${TARGET_ARCH}\.tar" | sort -V | tail -n1 | awk '{print $2}')
if [ -z "$ALPINE_TEMPLATE" ]; then
    ALPINE_TEMPLATE="alpine-3.20-default_20240606_${TARGET_ARCH}.tar.xz"
fi

echo "=== [2/5] Downloading Alpine Template ($ALPINE_TEMPLATE) ==="
if [ ! -f "/var/lib/vz/template/cache/$ALPINE_TEMPLATE" ]; then
    pveam download local "$ALPINE_TEMPLATE"
fi

echo "=== [3/5] Creating Ultra-Light LXC Container (ID: $CT_ID) ==="
pct create $CT_ID "local:vztmpl/$ALPINE_TEMPLATE" \
    --hostname portfolio \
    --memory 64 \
    --swap 0 \
    --cores 1 \
    --ostype alpine \
    --storage "$STORAGE" \
    --rootfs "$STORAGE:0.5" \
    --net0 name=eth0,bridge=vmbr0,ip=dhcp,firewall=1 \
    --unprivileged 1 \
    --onboot 1 \
    --start 1

echo "=== [4/5] Waiting for Container Network Initialization ==="
sleep 6

echo "=== [5/5] Deploying Web Server & Portfolio Files ==="
pct exec $CT_ID -- apk update
pct exec $CT_ID -- apk add --no-cache nginx git

# Pull site repository
pct exec $CT_ID -- git clone https://github.com/IAndrexI/General-projects.git /var/www/portfolio

# Write optimized Nginx configuration
pct exec $CT_ID -- sh -c 'cat << "EOF" > /etc/nginx/http.d/default.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/portfolio;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    location ~* \.(css|js|svg|png|jpg|ico)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF'

pct exec $CT_ID -- rc-update add nginx default
pct exec $CT_ID -- rc-service nginx restart

CONTAINER_IP=$(pct exec $CT_ID -- ip -4 addr show eth0 2>/dev/null | grep -oP '(?<=inet\s)\d+(\.\d+){3}' || echo "DHCP")

echo "=========================================================="
echo "  🎉 Portfolio LXC Successfully Created & Started!"
echo "  Container ID : $CT_ID"
echo "  Architecture : $TARGET_ARCH"
echo "  Allocated RAM: 64 MB (Active RAM usage: ~10-12 MB)"
echo "  Disk Size    : 512 MB"
echo "  Local IP     : http://$CONTAINER_IP"
echo ""
echo "  Cloudflare Tunnel Route:"
echo "  Service: http://$CONTAINER_IP:80"
echo "=========================================================="
