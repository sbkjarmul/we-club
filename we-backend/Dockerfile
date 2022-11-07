FROM node:lts

ENV DATABASE_URL=postgresql://postgres:123@we-db/nest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

# RUN npx prisma generate

# RUN npm run prisma:dev:deploy

# RUN npm run build

# CMD [ "node", "dist/main.js"]
