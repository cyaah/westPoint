FROM node:lts-alpine

WORKDIR /app/front-end

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3080

EXPOSE 3080

CMD ["npm", "run", "serve"]
