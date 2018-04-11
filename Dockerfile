# Docker image for hosting web content
# Be sure to run yarn build before building this container

FROM nginx:1.13.10-alpine

# Copy the nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the output of yarn build
COPY build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]