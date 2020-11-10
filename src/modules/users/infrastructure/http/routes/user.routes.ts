import { Router } from 'express';

import UserController from '@modules/users/infrastructure/http/controllers/UsersController';

const usersRouter = Router();

usersRouter.post('/users', UserController.create);

export default usersRouter;