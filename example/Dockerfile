FROM node:9

WORKDIR /example

COPY ./ ./
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start-service", "3000" ]