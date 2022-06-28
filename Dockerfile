FROM node:16.11

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn generate

COPY . .

RUN yarn build

CMD ["yarn", "start"]
