import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import http from 'http';
import { getItemDataRouter } from './routes/get-item-data';

const app = express();
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status(200).send('OK');
});

app.use('/scrape', getItemDataRouter);

app.all('*', () => {
  throw new Error();
});

const server = http.createServer(app);

export { server };
