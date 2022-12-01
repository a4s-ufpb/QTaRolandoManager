### STAGE 1: Build ###
FROM node:16-alpine as build
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN NODE_OPTIONS="--max-old-space-size=8192" npm run build-prod

### STAGE 2: Run ###
FROM nginx:1.23.2-alpine
VOLUME /var/cache/nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build app/dist/qtarolando-manager /usr/share/nginx/html
EXPOSE 80
