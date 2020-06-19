FROM node:12-alpine

RUN mkdir -p /var/app
WORKDIR /var/app

COPY ./ /var/app

EXPOSE 8080

RUN npm install
RUN npm run bootstrap
RUN npm run build

CMD ["npm" ,  "--prefix", "backend/", "run", "start-prod"]
