import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BcryptHashProvider from '@modules/users/providers/HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BcryptHashProvider
)