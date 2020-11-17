import { RedisOptions } from 'ioredis';

import { 
  REDIS_HOST, 
  REDIS_PASSWORD, 
  REDIS_PORT 
} from '@shared/utils/environment';

interface IRedisOptions {
  driver: string;
  config: RedisOptions;
}

export default {
  driver: 'redis',
  config: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD || undefined
  }
} as IRedisOptions;