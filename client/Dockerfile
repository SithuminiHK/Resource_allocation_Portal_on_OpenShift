# Stage 1: Build the Vite app
FROM node:18 AS builder
WORKDIR /app  
# This creates /app directory in container (doesn't need to exist locally)
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:1.25-alpine

# Install libcap for setcap
RUN apk add --no-cache libcap

# Remove default config and copy custom one
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Copy built files - adjusted path since your dist is at root
COPY --from=builder /app/dist /usr/share/nginx/html

# OpenShift compatibility adjustments
RUN chmod -R a+rwx /var/cache/nginx /var/run && \
    chown -R nginx:root /usr/share/nginx/html && \
    setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx

USER nginx
EXPOSE 5050
CMD ["nginx", "-g", "daemon off;"]