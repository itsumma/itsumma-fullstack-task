FROM node:14-alpine
RUN apk add --no-cache git

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY --chown=node:node . .

EXPOSE 5050

CMD ["npm","run", "start:migrate"]

