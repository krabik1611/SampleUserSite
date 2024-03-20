FROM node:21-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm install -g serve

COPY . /app

RUN npm run build

CMD ["serve","-s", "build", "-l", "3000"]
