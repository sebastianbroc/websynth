FROM node:16-alpine

WORKDIR /app/server

COPY package.json /app/server

COPY package-lock.json /app/server

RUN npm install

COPY . .

EXPOSE 8085
CMD ["node", "index.js"]
