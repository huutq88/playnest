#!/bin/bash

# ====================================================
# Cloudflare Origin SSL (CLF SSL) Nginx Config for PlayNest
# Supports Cloudflare Full / Full (Strict) SSL (Port 443)
# Usage: ./update_nginx.sh <domain> [port]
# Example: ./update_nginx.sh playnest.zone 3080
# ====================================================

DOMAIN=${1:-playnest.zone}
PORT=${2:-3080}
CONF_FILE="/etc/nginx/sites-available/playnest-$DOMAIN"
SSL_DIR="/etc/nginx/ssl"
CERT_FILE="$SSL_DIR/playnest.crt"
KEY_FILE="$SSL_DIR/playnest.key"

echo ">>> 1. Ensuring SSL Directory & Certificates exist..."
sudo mkdir -p $SSL_DIR

if [ ! -f "$CERT_FILE" ] || [ ! -f "$KEY_FILE" ]; then
    echo "🔑 Generating SSL cert fallback for Cloudflare Origin setup..."
    sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
        -keyout $KEY_FILE -out $CERT_FILE \
        -subj "/C=US/ST=State/L=City/O=Cloudflare/OU=Origin/CN=*.$DOMAIN" > /dev/null 2>&1
    echo "💡 Note: You can replace $CERT_FILE and $KEY_FILE with your Cloudflare Origin CA certificate anytime."
fi

echo ">>> 2. Writing Virtual Host Config for $DOMAIN (Target Port: $PORT)..."

sudo tee $CONF_FILE > /dev/null <<EOF
# --- HTTP: Redirect to HTTPS ---
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    return 301 https://\$host\$request_uri;
}

# --- HTTPS: PlayNest Web (Port $PORT) ---
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate         $CERT_FILE;
    ssl_certificate_key     $KEY_FILE;

    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_protocols TLSv1.2 TLSv1.3;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';

        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}
EOF

echo ">>> 3. Enabling site configuration (forcing symlink)..."
sudo ln -sf $CONF_FILE /etc/nginx/sites-enabled/playnest-$DOMAIN

echo ">>> 4. Testing Nginx configuration & Reloading..."
if sudo nginx -t; then
    sudo systemctl reload nginx
    echo "=================================================="
    echo "✅ CLOUDFLARE SSL (CLF SSL) READY FOR $DOMAIN!"
    echo "🔑 Cert Path: $CERT_FILE"
    echo "🔑 Key Path:  $KEY_FILE"
    echo "📍 PlayNest App: https://$DOMAIN (Port $PORT)"
    echo "=================================================="
else
    echo "❌ Nginx configuration test FAILED. Please check $CONF_FILE."
    exit 1
fi
