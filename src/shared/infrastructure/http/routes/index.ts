import { Router } from 'express';

import usersRouter from '@modules/users/infrastructure/http/routes/user.routes';

const routes = Router();

routes.post('/users', usersRouter);

export default routes;

