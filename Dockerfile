# ---- Build Stage ----
FROM node:lts-alpine AS builder

# Accept build arguments
ARG GTM_ID
ENV VITE_GTM_ID=$GTM_ID

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files and workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY react-router.config.ts ./
COPY vite.config.ts ./
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

# Build the React Router SSR app
RUN pnpm build

# ---- Runtime Stage ----
FROM node:lts-alpine AS runtime

# Install pnpm in runtime image
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Copy public assets (if needed by the SSR server)
COPY --from=builder /app/public ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactrouter -u 1001

USER reactrouter

EXPOSE 8080

# Start the React Router SSR server (Cloud Run will inject $PORT)
CMD ["pnpm", "run", "start"]
