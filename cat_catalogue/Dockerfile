FROM node:18-alpine3.17 as build

WORKDIR /app
COPY cat_catalogue/. .
COPY .env.cat_catalogue .
RUN mv .env.cat_catalogue .env

RUN npm install
RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=build /app/dist /usr/share/nginx/html
RUN apk update && \
    apk add curl
RUN rm -rf /var/cache/apk/*
RUN rm /etc/nginx/conf.d/default.conf

COPY cat_catalogue/deploy/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
