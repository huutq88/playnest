# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy root workspace configs
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./

# Copy packages and apps
COPY packages ./packages
COPY apps/web ./apps/web

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Build all packages & Next.js web application
RUN pnpm --filter @playnest/web build

# ── Stage 2: Production Runner ─────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy workspace root metadata
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY packages ./packages

# Copy built Next.js artifacts and packages
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["pnpm", "start"]
