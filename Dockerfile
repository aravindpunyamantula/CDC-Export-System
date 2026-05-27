FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN chmod +x start.sh

EXPOSE 8080

CMD ["sh", "start.sh"]