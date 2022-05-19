import * as express from 'express';
import { Request, Response } from 'express';
import { query } from 'express-validator';
import { getDataFrom } from '../puppeteer/scrape';

const router = express.Router();

router.get(
  '/',
  query('url').isURL().withMessage('url is not valid'),
  async (req: Request, res: Response) => {
    const { url } = req.query;

    if (!url) {
      throw new Error('url is not valid');
    }
    const result = await getDataFrom(String(url));

    res.send(result);
  }
);

export { router as getItemDataRouter };
