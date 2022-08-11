FROM node:16-alpine AS build-step

WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN pwd
RUN npm run build

CMD ["npm", "run", "start"]

FROM nginx:1.18-alpine
RUN pwd
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /build/build /frontend/build
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]