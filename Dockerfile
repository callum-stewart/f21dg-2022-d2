# syntax=docker/dockerfile:1

FROM node:16-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
EXPOSE 5000

RUN npm install

COPY . .

CMD [ "npm", "start"]
