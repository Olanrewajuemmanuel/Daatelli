FROM node:20-alpine as frontend_build
ARG BACKEND_URL
WORKDIR /app

COPY ./package.json ./yarn.lock ./tsconfig.json ./eslint.config.mjs ./tailwind.config.js /app/
RUN yarn install
COPY ./src /app/src
COPY ./public /app/public
RUN yarn build


FROM nginx
COPY --from=frontend_build /app/build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /usr/share/nginx/logs
ENV BACKEND_URL=$BACKEND_URL

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
