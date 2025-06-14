FROM node:alpine3.22

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . .

RUN npm i -g @nestjs/cli

EXPOSE 3000

CMD [ "npm" , "run", "start:dev" ]