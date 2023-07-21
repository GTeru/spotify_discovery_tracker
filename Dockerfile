FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:dev-18-bullseye

ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --verbose

COPY . ./

ENTRYPOINT ["npm", "run", "dev"]

