FROM node:18-alpine AS base

COPY . .

RUN npm run build

CMD ["node", ".next/standalone/server.js"]