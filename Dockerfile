# Stage 1: Install dependencies
FROM node:20-slim AS deps
RUN apt-get update && apt-get install -y openssl
WORKDIR /app

# Copy package.json and lock file
COPY package.json package-lock.json ./

# Copy prisma schema
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Stage 2: Build the application
FROM node:20-slim AS builder
RUN apt-get update && apt-get install -y openssl
WORKDIR /app

# Copy dependencies and prisma schema from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/prisma ./prisma/

# Copy the rest of the application source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Stage 3: Production image
FROM node:20-slim AS runner
RUN apt-get update && apt-get install -y openssl
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy built assets from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma/


# Copy the start script and make it executable
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose the port the app runs on
EXPOSE 3000

# The command to start the app using the start script
CMD ["./start.sh"]
