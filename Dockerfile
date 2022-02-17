FROM node:17-alpine3.14
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
RUN npm install --global expo-cli
COPY . .