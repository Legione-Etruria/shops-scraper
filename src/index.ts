import { server } from './app';
import { launchBrowser } from './puppeteer/puppeteer';

const main = async () => {
  await launchBrowser().catch((err) => console.error(err));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
};

main();
