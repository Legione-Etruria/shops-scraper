FROM oven/bun

RUN mkdir -p /puppeteer
WORKDIR /puppeteer

COPY ./ /puppeteer
COPY src ./src
RUN bun install
RUN bunx @puppeteer/browsers install chrome@stable --path $HOME/.cache/puppeteer
COPY . .

CMD ["bun", "prod"]