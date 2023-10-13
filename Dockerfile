FROM node:18-alpine AS base

COPY . .

RUN npm install --production

RUN npm run build

CMD ["npm", "start"]