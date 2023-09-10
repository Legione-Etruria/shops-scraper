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
    'https://www.taiwangun.com/morale-patches/taiwangun-pvc-patch-1-8fields-2?q=taiwangun'
  );
  await page.waitForNetworkIdle();

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
