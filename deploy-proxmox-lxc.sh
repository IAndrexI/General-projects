#!/bin/sh
# ==============================================================================
# Protutech Portfolio - Ultra-Lightweight Inside-LXC Deployment Script
# Run this inside ANY Proxmox LXC Container (Alpine, Debian, or Ubuntu)
# Memory Footprint: ~10-15 MB RAM total | 0% idle CPU
# ==============================================================================

set -e

echo "=== [1/4] Detecting Package Manager & Installing Nginx + Git ==="
if command -v apk >/dev/null 2>&1; then
    # Alpine Linux (Fastest & Lightest)
    apk update
    apk add --no-cache nginx git
    INIT_SYSTEM="openrc"
    NGINX_CONF_DIR="/etc/nginx/http.d"
elif command -v apt-get >/dev/null 2>&1; then
    # Debian / Ubuntu Linux
    export DEBIAN_FRONTEND=noninteractive
    apt-get update
    apt-get install -y --no-install-recommends nginx git ca-certificates
    INIT_SYSTEM="systemd"
    NGINX_CONF_DIR="/etc/nginx/sites-available"
else
    echo "Unsupported package manager. Please run on Alpine, Debian, or Ubuntu."
    exit 1
fi

echo "=== [2/4] Setting Up Web Directory ==="
mkdir -p /var/www/portfolio
mkdir -p /run/nginx

# Clone from GitHub if not already in directory
if [ ! -f "/var/www/portfolio/index.html" ]; then
    echo "Cloning latest portfolio from GitHub..."
    git clone https://github.com/IAndrexI/General-projects.git /tmp/portfolio-repo
    cp -r /tmp/portfolio-repo/* /var/www/portfolio/
    rm -rf /tmp/portfolio-repo
fi

echo "=== [3/4] Configuring High-Performance Nginx ==="
if [ "$INIT_SYSTEM" = "openrc" ]; then
    cat << 'EOF' > /etc/nginx/http.d/default.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/portfolio;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 256;

    location ~* \.(css|js|svg|png|jpg|ico)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
else
    cat << 'EOF' > /etc/nginx/sites-available/default
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/portfolio;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 256;

    location ~* \.(css|js|svg|png|jpg|ico)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
fi

echo "=== [4/4] Starting Nginx Service & Enabling on Boot ==="
if [ "$INIT_SYSTEM" = "openrc" ]; then
    rc-update add nginx default 2>/dev/null || true
    rc-service nginx restart
else
    systemctl enable nginx 2>/dev/null || true
    systemctl restart nginx
fi

IP_ADDR=$(ip -4 addr show eth0 2>/dev/null | grep -oP '(?<=inet\s)\d+(\.\d+){3}' || hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")

echo "=========================================================="
echo "  🎉 Protutech Portfolio Successfully Deployed!"
echo "  Access Locally : http://$IP_ADDR"
echo "  RAM Footprint  : ~10-15 MB"
echo "=========================================================="
