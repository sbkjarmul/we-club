FROM node:lts as builder

WORKDIR /app

ENV VITE_BASE_URL=http://3.83.191.5/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx as production-build
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]