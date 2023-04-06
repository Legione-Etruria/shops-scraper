FROM node:13.11.0

RUN mkdir -p /puppeteer
WORKDIR /puppeteer

COPY ./ /puppeteer
RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && wget http://archive.ubuntu.com/ubuntu/pool/main/libu/libu2f-host/libu2f-udev_1.1.4-1_all.deb \
     && dpkg -i libu2f-udev_1.1.4-1_all.deb \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ beta main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libxss1 fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils \
     && apt-get install -y libdrm2=2.4.75-1 libgbm1=17.1.0~rc2-1~deb9u1 libnss3=2:3.31-1~deb9u1 \
     && apt-mark hold libdrm2 libgbm1 libnss3 \
     && rm -rf /var/lib/apt/lists/* \
     && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     && chmod +x /usr/sbin/wait-for-it.sh

COPY package.json .
COPY tsconfig.json .
COPY src ./src
RUN npm install
RUN npm run build
COPY . .

CMD ["npm", "start"]
