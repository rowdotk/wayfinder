FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install --omit-dev

ENV NODE_ENV=production

ENV PORT=8000

EXPOSE 8000

CMD ["npx", "tsx", "server/src/index.ts"]