FROM gplane/pnpm:9-node21-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build
EXPOSE 8000
CMD ["pnpm", "start"]