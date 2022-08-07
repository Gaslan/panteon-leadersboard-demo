FROM node:15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3003
CMD [ "nodemon", "-L", "src/server.js" ]