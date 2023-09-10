import { server } from './app';
import { launchBrowser } from './puppeteer/puppeteer';

const main = async () => {
  console.log('starting server with config', process.env);

  if ('true' === process.env.ENABLE_PUPPETEER) {
    await launchBrowser().catch((err) => console.error('PUPPETEER ERROR', err));
  }

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
};

main();
