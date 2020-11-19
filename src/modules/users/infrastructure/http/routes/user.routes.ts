import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '@modules/users/infrastructure/http/controllers/UsersController';

import ensureAuthentication from '@modules/users/infrastructure/http/middlewares/EnsureAuthentication';

const usersRouter = Router();

usersRouter.post('/users', celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    bio: Joi.string().required()
  }
}, { abortEarly: false }), UserController.create);

usersRouter.get(
  '/users', 
  ensureAuthentication, 
  UserController.index
);

export default usersRouter;