FROM oven/bun

WORKDIR /usr/src/app
COPY ./ /usr/src/app

RUN bunx @puppeteer/browsers install chrome@stable --path $HOME/.cache/puppeteer
COPY . .

CMD ["bun", "prod"]