FROM node:22-alpine as build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:22-alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build /app
EXPOSE 9000
CMD ["serve", "-s", ".", "-l", "9000"]
