import { server } from './app';
import { launchBrowser } from './puppeteer/puppeteer';

export const main = async () => {
  if ('true' === process.env.ENABLE_PUPPETEER) {
    await launchBrowser().catch((err) => console.error(err));
  }

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
};

main();
