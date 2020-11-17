import { container } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider
);