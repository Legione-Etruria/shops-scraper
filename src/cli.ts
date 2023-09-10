import { program } from 'commander';
import { getDataFromShop } from './puppeteer';
import { launchBrowser } from './puppeteer/puppeteer';

const scrape = async (url: string) => {
  const result = await getDataFromShop(String(url), {
    checkAvailability: false,
  }).catch((err) => program.error(err));

  console.log(result);
};

program
  .name('string-util')
  .description(
    'CLI per fare scraping di prodotti taiwangun e ilsemaforo, usato per test locali'
  )
  .version('0.8.0');

program
  .command('scrape')
  .description('Effettua lo scraping ti un prodotto')
  .argument('<string>', 'url del prodotto')
  .action(async (str, options) => {
    await launchBrowser().catch((err) => console.error(err));

    await scrape(str);

    process.exit(0);
  });

program.parse();
