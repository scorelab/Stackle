FROM node:boron

#create the app directory
WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080
CMD [ "npm", "start"]