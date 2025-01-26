# Stage 1: Build application
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && \
    ls -la /app/dist && \
    [ -f /app/dist/index.html ] || (echo "Missing index.html" && exit 1)

# Stage 2: Production server
FROM nginx:stable-alpine as production-stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    find /usr/share/nginx/html -type d -exec chmod 755 {} \; && \
    find /usr/share/nginx/html -type f -exec chmod 644 {} \;
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]