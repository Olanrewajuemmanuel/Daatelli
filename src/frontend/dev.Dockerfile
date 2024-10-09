FROM node:20-alpine
WORKDIR /app

COPY ./package.json ./yarn.lock ./tsconfig.json ./eslint.config.mjs ./tailwind.config.js /app/

RUN yarn install
COPY ./src /app/src

RUN yarn build

EXPOSE 3000

CMD ["yarn start"]
