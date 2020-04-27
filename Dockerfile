FROM node:12

WORKDIR /usr/src/server

COPY package*.json /usr/src/server
RUN npm install

COPY . /usr/src/server