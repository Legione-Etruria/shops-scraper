/**
 * Ottieni un array di elementi mostrati a schermo con la stessa classe CSS
 */
export const getRenderedElements = async (
  config: IParams = {
    DOM: null,
    prop: '',
    valueType: 'innerText',
  }
) => {
  const page: any = config.DOM;
  let getElems: any = await page.$$(config.prop);

  const elemsArray = Promise.all(
    await getElems.reduce(
      async (acc: Promise<any[]>, curr: any, index: number) => {
        const res = await acc;
        const elem = await (
          await curr.getProperty(config.valueType)
        ).jsonValue();
        return [...res, elem];
      },
      Promise.resolve([])
    )
  );
  return await elemsArray;
};

export interface IParams {
  DOM: any;
  prop: string;
  valueType: string;
}
