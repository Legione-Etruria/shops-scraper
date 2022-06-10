import * as express from 'express';
import { Request, Response } from 'express';
import { query } from 'express-validator';
import { getDataFrom } from '../puppeteer/scrape';

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

    if (!url) {
      throw new Error('url is not valid');
    }

    console.info(`Scraping ${url}`);
    const result = await getDataFrom(String(url), {
      checkAvailability: 'true' === checkAvailability,
    });

    res.send(result);
  }
);

export { router as getItemDataRouter };
