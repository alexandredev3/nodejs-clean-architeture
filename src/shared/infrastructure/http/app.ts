import express from 'express';

import '@shared/infrastructure/typeorm';
import '@shared/container';

import routes from '@shared/infrastructure/http/routes';

export const app = express();

app.use(express.json());
app.use(routes);