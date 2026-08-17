FROM nginx:alpine

# Install curl for Docker health checks
RUN apk add --no-cache curl

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend application
COPY src/ /usr/share/nginx/html/

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Nginx listens on port 80
EXPOSE 80

# Docker health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]