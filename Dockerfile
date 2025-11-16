FROM node:22.19 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.19

RUN npm install -g serve

WORKDIR /app

COPY --from-build /app/build ./build

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]