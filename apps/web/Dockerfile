# ── Stage 1: Workspace Dependencies Layer (Cached by Docker) ───────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app

# Copy ONLY workspace config & package manifests first to maximize Docker layer caching
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/level-schema/package.json ./packages/level-schema/
COPY packages/puzzle-engine/package.json ./packages/puzzle-engine/
COPY apps/web/package.json ./apps/web/

# Install dependencies (Layer is CACHED unless package.json / pnpm-lock changes!)
RUN pnpm install --frozen-lockfile || pnpm install

# ── Stage 2: Application Builder ─────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@9.15.4 --activate
WORKDIR /app

# Copy cached node_modules and manifests from deps stage
COPY --from=deps /app ./

# Copy workspace source code
COPY packages ./packages
COPY apps/web ./apps/web

# Build Arguments for Next.js NEXT_PUBLIC_ environment variables
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID
ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
ENV NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

# Build Next.js application (standalone output mode)
RUN pnpm --filter @playnest/web build

# ── Stage 3: Ultra-Fast Production Runner ──────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy Next.js standalone bundle (traced dependencies, ~30MB total)
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
