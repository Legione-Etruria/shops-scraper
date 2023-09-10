import { Page } from 'puppeteer';
import { browser } from './puppeteer';
import { getRenderedElements } from './utils/utils';

interface Ioptions {
  checkAvailability: boolean;
}

interface Iscraped {
  price?: number;
  isUnavailable?: boolean;
  name?: string;
  imgSrc?: string;
}

export const getDataFromShop = async (url: string, options: Ioptions) => {
  const urlSplit = url.split('www.');
  const domain = urlSplit[1];
  let scrapedData: Iscraped = {} as any;

  const ilSemaforo = domain.startsWith('ilsemaforo');
  const taiwangun = domain.startsWith('taiwangun');

  if (!ilSemaforo && !taiwangun) {
    console.log('Invalid domain');
    throw new Error('Sito web non valido');
  }

  const page = await browser.newPage();
  await page.browserContext().overridePermissions(url, ['geolocation']);
  await page
    .setGeolocation({ latitude: 43.879608, longitude: 11.09625 })
    .catch(genericErrorHandler);
  await page.goto(url).catch(genericErrorHandler);
  await page.waitForNetworkIdle();

  if (ilSemaforo) {
    scrapedData = await _extractIlSemaforo(page, options);
  }

  if (taiwangun) {
    scrapedData = await _extractTaiwangun(page, options);
  }

  await page.close();
  return scrapedData;
};

const _extractIlSemaforo = async (
  page: Page,
  options: Ioptions
): Promise<Iscraped> => {
  await page.waitForSelector('#s99_price').catch(genericErrorHandler);

  const availabilityLabel = await getRenderedElements({
    DOM: page,
    prop: '#s99_availability',
    valueType: 'innerText',
  }).catch(genericErrorHandler);

  if (options.checkAvailability) {
    if (!availabilityLabel) {
      throw new Error('Error while extracting data');
    }
    return {
      isUnavailable: availabilityLabel[0].toLowerCase() !== 'disponibile',
    };
  }

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

  if (!price || !name || !imgSrc || !availabilityLabel) {
    throw new Error('Error while extracting data');
  }

  return {
    price: Number(price[0].replace('€', '').replace(',', '.')),
    isUnavailable: availabilityLabel[0].toLowerCase() !== 'disponibile',
    name: name[0],
    imgSrc: imgSrc[0],
  };
};

const _extractTaiwangun = async (
  page: Page,
  options: Ioptions
): Promise<Iscraped> => {
  const unavailable = await page.$('div.product-unavailable-label');

  if (options.checkAvailability) {
    return {
      isUnavailable: unavailable !== null,
    };
  }

  const price = await getRenderedElements({
    DOM: page,
    prop: 'span.price',
    valueType: 'innerText',
  }).catch(genericErrorHandler);

  console.info(`Price: ${price}`);

  const name = await getRenderedElements({
    DOM: page,
    prop: 'div.product-header',
    valueType: 'innerText',
  }).catch(genericErrorHandler);

  console.info(`Name: ${name}`);
  const imgSrc = await getRenderedElements({
    DOM: page,
    prop: 'img.b-loaded',
    valueType: 'src',
  }).catch(genericErrorHandler);

  console.info(`ImgSrc: ${imgSrc}`);

  if (!name || !imgSrc) {
    throw new Error('Error while extracting data');
  }

  return {
    price: price?.length ? Number(price[0].replace('€', '')) : 0,
    name: name[0],
    imgSrc: imgSrc[0],
    isUnavailable: unavailable !== null,
  };
};

const genericErrorHandler = (err: Error) => {
  console.error(err);
  return null;
};
