FROM node:18-bookworm

ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --verbose

COPY . ./

ENTRYPOINT ["npm", "run", "dev"]

