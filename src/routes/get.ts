import * as express from 'express';
import { Request, Response } from 'express';
import { query } from 'express-validator';
import { getDataFromShop } from '../puppeteer';

const router = express.Router();

router.get(
  '/',
  query('url').isURL().withMessage('url is not valid'),
  query('checkAvailability')
    .optional()
    .isBoolean()
    .withMessage('checkAvailability is not valid'),
  query('apikey')
    .custom((val) => val === process.env.API_KEY)
    .withMessage('apikey is not valid'),
  async (req: Request, res: Response) => {
    const { url, checkAvailability } = req.query;

    if ('false' === process.env.ENABLE_PUPPETEER) {
      throw new Error(
        "Puppeteer non abilitato. Contattare l'amministratore del sito"
      );
    }

    if (!url) {
      throw new Error('url is not valid');
    }

    console.info(`Scraping ${url}`);
    const result = await getDataFromShop(String(url), {
      checkAvailability: 'true' === checkAvailability,
    });

    if (!result) {
      return res.status(500).json({
        message: 'Error while scraping the page',
      });
    }

    res.send(result);
  }
);

export { router as getItemDataRouter };
