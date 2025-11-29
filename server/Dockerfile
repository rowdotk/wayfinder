FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production

ENV PORT=8000

EXPOSE 8000

CMD ["node", "dist/index.js"]