#!/bin/bash
# ====================================================
# Independent Zero-Downtime Deployment script for PlayNest
# Isolated project namespace: playnest
# Safe for shared servers with multiple existing apps
# Usage: ./deploy.sh
# ====================================================

set -e

PROJECT_NAME="playnest"
COMPOSE_FILE="docker-compose.prod.yml"

echo "====== 1. Pulling latest PlayNest code ======"
if [ -d ../.git ]; then
  echo "🔄 Pulling PlayNest monorepo..."
  cd ..
  git reset --hard
  git clean -fd
  git pull
  cd deploy || exit
else
  echo "ℹ️ Skipping git pull (not a git repo or directory)."
fi

echo "====== 2. Building & Zero-Downtime Deploying PlayNest ======"
echo "🏗️ Building PlayNest Docker image (isolated project: $PROJECT_NAME)..."
docker compose -p $PROJECT_NAME -f $COMPOSE_FILE build playnest-web

echo "🔄 Swapping to new PlayNest container..."
docker compose -p $PROJECT_NAME -f $COMPOSE_FILE up -d --no-deps --force-recreate playnest-web

echo "====== 3. Cleaning up old PlayNest images ONLY ======"
OLD_IMAGES=$(docker images playnest-web --format "{{.ID}}" | tail -n +2)
if [ -n "$OLD_IMAGES" ]; then
  docker rmi -f $OLD_IMAGES 2>/dev/null || true
  echo "✅ Removed old PlayNest images."
fi

echo "🚀 PlayNest deployed successfully in complete isolation!"
