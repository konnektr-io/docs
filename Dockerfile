### ---- Build Stage ----
FROM node:lts-alpine AS builder

# Accept build arguments
ARG GTM_ID
ENV NEXT_PUBLIC_GTM_ID=$GTM_ID

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files and workspace config
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY mdx-components.tsx ./
COPY source.config.ts ./
COPY source.generated.ts ./
COPY components.json ./

# Copy source code
COPY ./app ./app
COPY ./content ./content
COPY ./public ./public

# Install dependencies
RUN pnpm install --frozen-lockfile

# Verify GTM_ID is set (for debugging)
RUN echo "Building with NEXT_PUBLIC_GTM_ID: $NEXT_PUBLIC_GTM_ID"

# Build the Next.js app
RUN pnpm build

### ---- Runtime Stage ----
FROM node:lts-alpine AS runtime

# Install pnpm in runtime image
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/mdx-components.tsx ./mdx-components.tsx
COPY --from=builder /app/content ./content
COPY --from=builder /app/app ./app
COPY --from=builder /app/source.config.ts ./source.config.ts
COPY --from=builder /app/source.generated.ts ./source.generated.ts
COPY --from=builder /app/components.json ./components.json

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

# Start the Next.js production server
CMD ["pnpm", "start"]
