import express from 'express';

import '@shared/infrastructure/typeorm';
import '@shared/container';

import routes from '@shared/infrastructure/http/routes';
import rateLimiter from '@shared/infrastructure/http/middlewares/rateLimiter';

export const app = express();

app.use(express.json());

app.use(rateLimiter);
app.use(routes);