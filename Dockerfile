FROM node:18-alpine AS builder

WORKDIR /usr/app

COPY package*.json .

RUN npm i

COPY . .

# build app for production with minification
RUN npm run build


# serve by Nginx
FROM nginx:stable-alpine

COPY --from=builder /usr/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
