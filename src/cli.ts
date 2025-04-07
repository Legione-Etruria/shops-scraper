import { program } from 'commander';
import { getDataFromShop } from './puppeteer';
import { launchBrowser } from './puppeteer/puppeteer';

const scrape = async (url: string) => {
  await launchBrowser().catch((err) => console.error(err));
  const result = await getDataFromShop(String(url), {
    checkAvailability: false,
  }).catch((err) => program.error(err));

  console.log(result);

  process.exit(0);
};

program
  .name('string-util')
  .description(
    'CLI per fare scraping di prodotti taiwangun e ilsemaforo, usato per test locali'
  );

program
  .command('scrape')
  .description('Effettua lo scraping di un prodotto')
  .argument('<string>', 'url del prodotto')
  .action(async (str, options) => await scrape(str));

program.parse();
