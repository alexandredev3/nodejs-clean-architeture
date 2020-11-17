import { Router } from 'express';

import UserController from '@modules/users/infrastructure/http/controllers/UsersController';

import ensureAuthentication from '@modules/users/infrastructure/http/middlewares/EnsureAuthentication';

const usersRouter = Router();

usersRouter.post('/users', UserController.create);

usersRouter.use(ensureAuthentication);

usersRouter.get('/users', UserController.index);

export default usersRouter;