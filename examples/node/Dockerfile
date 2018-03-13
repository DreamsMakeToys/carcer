FROM node:carbon

WORKDIR /usr/src/app

COPY ./ ./
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start-service", "3000" ]