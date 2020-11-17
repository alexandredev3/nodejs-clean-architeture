import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUserRepository from '@modules/users/repositories/ICreateUsersRepository';
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';

// Registrando Container
/**
 * O Singleton ele cria uma unica estancia para toda aplicação, independente do request.
  * Ele vai manter esse objeto no ciclo de vida inteiro da aplicação.
  * ele vai criar esse objeto uma vez, e ele vai ser reutilizado toda vez que eu injetar essa dependecia.
  * ele não cria um objeto novo, ele so vai criar outro objeto se aplicação parar de vez.
 */
container.registerSingleton<IUserRepository>(
  // UsersRepository tem que ser o mesmo nome la do @modules/users/services/CreateUserService.ts
  'UsersRepository',
  UsersRepository
);
