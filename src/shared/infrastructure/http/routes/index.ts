import { Router } from 'express';

import usersRouter from '@modules/users/infrastructure/http/routes/user.routes';
import sessionsRouter from '@modules/users/infrastructure/http/routes/sessions.routes';

const routes = Router();

routes.post('/users', usersRouter);
routes.get('/users', usersRouter);

routes.post('/session', sessionsRouter);

export default routes;

