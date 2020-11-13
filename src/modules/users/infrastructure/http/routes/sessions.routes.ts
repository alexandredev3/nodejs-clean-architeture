import { Router } from 'express';

import UserController from '@modules/users/infrastructure/http/controllers/SessionController';

const usersRouter = Router();

usersRouter.post('/session', UserController.create);

export default usersRouter;