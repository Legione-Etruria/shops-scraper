import { Page } from 'puppeteer';
import { browser } from './puppeteer';
import { getRenderedElements } from './utils/utils';

export const getDataFrom = async (url: string) => {
  const urlSplit = url.split('www.');
  const domain = urlSplit[1];
  let scrapedData: { price: number; name: string | undefined } = {} as any;

  const ilSemaforo = domain.startsWith('ilsemaforo');
  const taiwangun = domain.startsWith('taiwangun');

  if (!ilSemaforo && !taiwangun) {
    console.log('Invalid domain');
    throw new Error('Sito web non valido');
  }

  const page = await browser.newPage();
  await page.goto(url).catch(genericErrorHandler);
  await page.waitForNetworkIdle();

  if (ilSemaforo) {
    scrapedData = await _extractIlSemaforo(page);
  }

  if (taiwangun) {
    scrapedData = await _extractTaiwangun(page);
  }

  await page.close();
  return scrapedData;
};

const _extractIlSemaforo = async (page: Page) => {
  await page.waitForSelector('#s99_price').catch(genericErrorHandler);

  const price: string[] | null = await getRenderedElements({
    DOM: page,
    prop: '#s99_price',
    valueType: 'innerText',
  }).catch(genericErrorHandler);
  const name: string[] | null = await getRenderedElements({
    DOM: page,
    prop: '#s99_product_name',
    valueType: 'innerText',
  }).catch(genericErrorHandler);

  const imgSrc: string[] | null = await getRenderedElements({
    DOM: page,
    prop: 'img.attachment-shop_single',
    valueType: 'src',
  }).catch(genericErrorHandler);

  if (!price || !name || !imgSrc) {
    throw new Error('Error while extracting data');
  }

  return {
    price: Number(price[0].replace('€', '').replace(',', '.')),
    name: name[0],
    imgSrc: imgSrc[0],
  };
};

const _extractTaiwangun = async (page: Page) => {
  await page.waitForSelector('span[class="price"]').catch(genericErrorHandler);

  const price = await getRenderedElements({
    DOM: page,
    prop: 'span[class="price"]',
    valueType: 'innerText',
  }).catch(genericErrorHandler);

  const name = await getRenderedElements({
    DOM: page,
    prop: 'div.product-header',
    valueType: 'innerText',
  }).catch(genericErrorHandler);
  const imgSrc = await getRenderedElements({
    DOM: page,
    prop: 'img.b-loaded',
    valueType: 'src',
  }).catch(genericErrorHandler);

  if (!price || !name || !imgSrc) {
    throw new Error('Error while extracting data');
  }

  return {
    price: Number(
      price
        .filter((i) => i && (i.startsWith('€') || i.startsWith('$')))[0]
        .replace('€', '')
    ),
    name: name[0],
    imgSrc: imgSrc[0],
  };
};

const genericErrorHandler = (err: Error) => {
  console.error(err);
  return null;
};
