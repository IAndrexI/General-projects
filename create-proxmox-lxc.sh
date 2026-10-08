#!/bin/bash
# ==============================================================================
# Proxmox VE Turnkey LXC Creator - Protutech Portfolio
# Run directly in your Proxmox VE Host Shell (PVE Node Shell)
# Creates an ultra-lightweight Alpine Linux container (~10-15MB RAM, 512MB disk)
# ==============================================================================

set -e

# Automatically assign next available container ID
CT_ID=$(pvesh get /cluster/nextid 2>/dev/null || echo "200")
STORAGE="local-lvm"
[ ! -d "/var/lib/vz/template/cache" ] && STORAGE="local"

echo "=== [1/5] Updating Proxmox Appliance Catalog ==="
pveam update >/dev/null 2>&1 || true

ALPINE_TEMPLATE=$(pveam available -section system 2>/dev/null | grep -E "alpine-[0-9]" | sort -V | tail -n1 | awk '{print $2}')
if [ -z "$ALPINE_TEMPLATE" ]; then
    ALPINE_TEMPLATE="alpine-3.20-default_20240606_amd64.tar.xz"
fi

echo "=== [2/5] Downloading Alpine Template ($ALPINE_TEMPLATE) ==="
if [ ! -f "/var/lib/vz/template/cache/$ALPINE_TEMPLATE" ]; then
    pveam download local "$ALPINE_TEMPLATE" || true
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
echo "  Allocated RAM: 64 MB (Active RAM usage: ~12 MB)"
echo "  Disk Size    : 512 MB"
echo "  Local IP     : http://$CONTAINER_IP"
echo ""
echo "  Cloudflare Tunnel Setup:"
echo "  Service: http://$CONTAINER_IP:80"
echo "=========================================================="
