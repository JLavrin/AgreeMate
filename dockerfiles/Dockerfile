FROM node:18-alpine
WORKDIR /app

RUN apk add --no-cache python3 make g++
COPY ./vite-app/package*.json ./
RUN npm install

COPY ./vite-app .

RUN npm build

WORKDIR /app/server
COPY ./server/package*.json ./
RUN npm install

COPY ./server .

EXPOSE 3000

CMD [ "yarn", "start" ]
