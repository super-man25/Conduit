# Build the code
FROM node:9.9.0 as build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# nginx server
FROM nginx:1.13.10-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]