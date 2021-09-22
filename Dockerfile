FROM node:12-alpine AS build
MAINTAINER "(C) Danil Andreev | danssg08@gmail.com | https://github.com/DanilAndreev"

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile install

# Build project
COPY . .
RUN npm run build:compile

FROM node:12
ENV PORT $PORT

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \

RUN apt-get install libxtst6

#RUN mkdir /dest
COPY --from=build dest/ dest/
COPY --from=build LICENSE /
COPY --from=build package.json /
COPY --from=build yarn.lock /
COPY --from=build README.md /
WORKDIR /

# Installing production version of node modules
RUN yarn --frozen-lockfile install --production
# Expose ports
EXPOSE $PORT


#CMD ["google-chrome-stable && node /dest/index.js"]
CMD ["google-chrome-stable"]
