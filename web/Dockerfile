### STAGE 1: Build ###

# We label our stage as ‘builder’
FROM node:11.1-alpine as builder

COPY package.json package-lock.json ./
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .
RUN npm install

## Build the angular app in production mode and store the artifacts in dist folder
RUN NODE_OPTIONS=--max-old-space-size=4096 $(npm bin)/ng build --prod


FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html
COPY --from=builder /ng-app/dist/web /usr/share/nginx/html