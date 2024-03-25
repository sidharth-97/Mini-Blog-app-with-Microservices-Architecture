FROM node:alpine

WORKDIR /app

COPY ./ ./

RUN npm install --fetch-timeout=600000


CMD [ "npm", "start" ]