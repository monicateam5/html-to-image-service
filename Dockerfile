FROM node:12-alpine AS build
MAINTAINER "(C) Danil Andreev | danssg08@gmail.com | https://github.com/DanilAndreev"

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile install

# Build project
COPY . .
RUN npm run build:compile

FROM node:12-slim
ENV PORT $PORT

RUN apt-get update
RUN apt-get install -y \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils


RUN mkdir /dest
COPY --from=build dest/ dest/
COPY --from=build LICENSE /
COPY --from=build package.json /
COPY --from=build yarn.lock /
COPY --from=build README.md /
WORKDIR /

# Installing production version of node modules
RUN yarn --frozen-lockfile install --production

RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules \
    && chown -R pptruser:pptruser /package.json \
    && chown -R pptruser:pptruser /yarn.lock

# Expose ports
EXPOSE $PORT

USER pptruser

RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium

CMD ["node", "/dest/index.js"]
