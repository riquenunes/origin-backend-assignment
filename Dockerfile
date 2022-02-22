### builder
FROM node:16.14-alpine as builder

WORKDIR /app
ADD package.json .
ADD package-lock.json .
RUN npm install

ADD src ./src
ADD tsconfig.json .
RUN npm run build
RUN npm prune --production

USER node

### app
FROM node:16.14-alpine as app

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/dist .

USER node
