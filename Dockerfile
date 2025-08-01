FROM ghcr.io/ghcr.io/puppeteer/puppeteer:24.13.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["node", "server.js"]

