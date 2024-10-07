FROM node:20-alpine
WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./eslint.config.mjs ./public ./tailwind.config.js /app/
RUN npm install
COPY ./src /app/src

CMD ["npm start"]