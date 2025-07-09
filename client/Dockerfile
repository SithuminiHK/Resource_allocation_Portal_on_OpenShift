# Stage 1: Build the Vite + React app
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Node (no Nginx)
FROM node:18-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist /app/dist

# Use an OpenShift-friendly port
EXPOSE 3000

# Start the static file server
CMD ["serve", "-s", "dist", "-l", "3000"]
