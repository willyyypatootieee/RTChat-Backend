FROM node:24-alpine AS dependencies

WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

FROM dependencies AS build

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build

FROM node:24-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY package.json yarn.lock ./
RUN corepack enable \
    && yarn install --frozen-lockfile --production \
    && yarn cache clean

COPY --from=build /app/dist ./dist

USER node
EXPOSE 3001

CMD ["node", "dist/src/main.js"]
