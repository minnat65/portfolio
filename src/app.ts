import 'express-async-errors';
import 'dotenv/config';
import express from "express";
import { json } from "body-parser";

import { errorHandler } from './middleware/errorHandler';
import { stockRouter } from './routes/stock';
import { tradeRouter } from './routes/trades';
import { portfolioRouter } from './routes/portfolio';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use('/api/v1', stockRouter);
app.use('/api/v1', tradeRouter);
app.use('/api/v1', portfolioRouter);

app.use('*', async () => {
  throw new Error('Not Found')
})

app.use(errorHandler);

export { app };
