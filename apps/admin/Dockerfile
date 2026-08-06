# ── Stage 1: Workspace Dependencies Layer (Cached by Docker) ───────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app

# Copy ONLY workspace config & package manifests first to maximize Docker layer caching
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/level-schema/package.json ./packages/level-schema/
COPY packages/puzzle-engine/package.json ./packages/puzzle-engine/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/game-sdk/package.json ./packages/game-sdk/
COPY apps/admin/package.json ./apps/admin/

# Install dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# ── Stage 2: Application Builder ─────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app

# Copy cached node_modules and manifests from deps stage
COPY --from=deps /app ./

# Copy workspace source code
COPY packages ./packages
COPY apps/admin ./apps/admin

# Build Next.js application (standalone output mode)
RUN pnpm --filter @playnest/admin build

# ── Stage 3: Ultra-Fast Production Runner ──────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy Next.js standalone bundle
COPY --from=builder /app/apps/admin/public ./apps/admin/public 2>/dev/null || true
COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./apps/admin/.next/static

EXPOSE 3000

CMD ["node", "apps/admin/server.js"]
