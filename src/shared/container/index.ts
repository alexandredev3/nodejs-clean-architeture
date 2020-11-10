import { container } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository';
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';

// Registrando Container
container.registerSingleton<IUserRepository>(
  // UsersRepository tem que ser o mesmo nome la do @modules/users/services/CreateUserService.ts
  'UsersRepository',
  UsersRepository
);