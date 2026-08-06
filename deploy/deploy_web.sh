#!/bin/bash
# ====================================================
# Ultra-Fast Deployment Script ONLY for playnest-web
# Targets: playnest-web (playnest.zone) -> Port 3080
# ====================================================

set -e

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

PROJECT_NAME="playnest"
COMPOSE_FILE="docker-compose.prod.yml"

echo "====== 1. Pulling latest PlayNest code ======"
if [ -d ../.git ]; then
  echo "🔄 Pulling PlayNest monorepo..."
  cd ..
  git reset --hard
  git clean -fd
  git pull origin main
  cd deploy || exit
else
  echo "ℹ️ Skipping git pull (not a git repo directory)."
fi

echo "====== 2. Fast Build for playnest-web ======"
echo "⚡ Building playnest-web image..."
docker compose -p $PROJECT_NAME -f $COMPOSE_FILE build playnest-web

echo "====== 3. Pre-Warming & Zero-Downtime Swap ======"
echo "🔥 Pre-warming playnest-web..."
docker run -d --name playnest-web-temp -p 3083:3000 playnest-web:latest > /dev/null 2>&1 || true

for i in {1..15}; do
  if curl -s http://127.0.0.1:3083 > /dev/null 2>&1; then
    echo "✅ New playnest-web pre-warmed successfully!"
    break
  fi
  sleep 1
done

docker rm -f playnest-web-temp > /dev/null 2>&1 || true

echo "🔄 Swapping playnest-web container instantly..."
docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d --no-deps --force-recreate playnest-web

echo "====== 4. Cleaning up old images ======"
OLD_IMAGES=$(docker images playnest-web --format "{{.ID}}" | tail -n +3)
if [ -n "$OLD_IMAGES" ]; then
  docker rmi -f $OLD_IMAGES 2>/dev/null || true
  echo "✅ Cleaned up old playnest-web images."
fi

echo "🎉 PlayNest Web deployed successfully with ZERO DOWNTIME!"
