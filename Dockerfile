### ---- Build Stage ----
FROM node:lts-alpine AS builder

# Accept build arguments
ARG GTM_ID
ENV NEXT_PUBLIC_GTM_ID=$GTM_ID

# Install dependencies needed for build (git for fumadocs lastModified)
RUN apk add --no-cache git

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy configuration files first
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build the Next.js app (Next.js standalone mode is enabled in next.config.mjs)
RUN pnpm build

### ---- Runtime Stage ----
FROM node:lts-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy standalone build and static assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by Next.js standalone output
CMD ["node", "server.js"]
