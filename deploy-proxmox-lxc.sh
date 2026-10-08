#!/bin/sh
# ==============================================================================
# Protutech Portfolio - Ultra-Lightweight Alpine LXC Setup Script
# Run this inside your Proxmox PVE Shell or inside an Alpine LXC Container
# Footprint: ~15 MB RAM, 0% CPU at idle, auto-starts on boot
# ==============================================================================

set -e

echo "=== [1/4] Installing Nginx & Git ==="
apk update
apk add --no-cache nginx git

echo "=== [2/4] Setting up Portfolio Directory ==="
mkdir -p /var/www/portfolio
mkdir -p /run/nginx

# If running standalone, clone or copy files here:
# git clone https://github.com/IAndrexI/portfolio.git /var/www/portfolio

echo "=== [3/4] Configuring High-Performance Nginx ==="
cat << 'EOF' > /etc/nginx/http.d/default.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/portfolio;
    index index.html;

    # Gzip compression for fast loading
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 256;

    # Cache static assets
    location ~* \.(css|js|svg|png|jpg|ico)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    # SPA / clean routing fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

echo "=== [4/4] Enabling Auto-start & Starting Nginx ==="
rc-update add nginx default
rc-service nginx restart

echo "=== Deployment Complete! ==="
echo "Local IP: $(ip -4 addr show eth0 2>/dev/null | grep -oP '(?<=inet\s)\d+(\.\d+){3}' || hostname -I)"
echo "Test locally with: curl http://localhost"
