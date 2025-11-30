FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 8001

CMD ["npm", "run", "start:client", "--", "--host", "0.0.0.0", "--port", "8001"]
