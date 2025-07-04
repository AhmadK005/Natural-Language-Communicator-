FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", ".", "-l", "3000"]
