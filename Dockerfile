FROM node:14-alpine AS builder

WORKDIR "/app"
COPY . .
RUN yarn --frozen-lockfile
RUN yarn build

FROM node:14-alpine AS production

WORKDIR "/app"

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD [ "sh", "-c", "yarn start:prod"]
