import { Page } from 'puppeteer';

/**
 * Ottieni un array di elementi mostrati a schermo con la stessa classe CSS
 */
export const getRenderedElements = async (config: IParams) => {
  const page = config.DOM;
  const getElems = await page.$$(config.prop);

  const elemsArray = Promise.all(
    await getElems.reduce(async (acc: Promise<any[]>, curr, index: number) => {
      const res = await acc;
      const elem = await (await curr.getProperty(config.valueType)).jsonValue();
      return [...res, elem];
    }, Promise.resolve([]))
  );
  return await elemsArray;
};

export const setItalianLocale = async (page: Page) => {
  await page.goto(
    'https://www.taiwangun.com/morale-patches/shotgun-girl-pvc-patch-8fields'
  );
  await page.waitForNetworkIdle();
  //dismiss cookies by clicking on a button that contains the text "Allow all"
  await page.click(`a[data-type="accept-cookies-button"]`);

  (await page.$('div[data-id="formy-dostawy"]'))?.evaluate((el) => {
    el.scrollIntoView();
    el.style.display = 'block';
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.select(`#UserCartDataCountryId`, '23');
  await page.type('#UserCartDataPostCode', '59100');

  await page.click("input[class='btn-next btn btn-primary btn-lg']");

  await page.waitForSelector("div[class='message info']");

  console.warn('🇮🇹 Italian locale set 👌');
};

export interface IParams {
  DOM: Page;
  prop: string;
  valueType: string;
}
