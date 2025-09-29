# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY src/ ./src/
COPY tsconfig.json ./
RUN npm ci && npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts && npm cache clean --force
COPY --from=builder /app/build ./build
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs
CMD ["node", "build/index.js"]