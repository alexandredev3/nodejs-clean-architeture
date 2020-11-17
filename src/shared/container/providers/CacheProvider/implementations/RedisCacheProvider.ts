import Redis, { Redis as RedisClient } from 'ioredis';

import RedisConfig from '@config/redis';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ICacheProviderDTO from '@shared/container/providers/CacheProvider/dtos/ICacheProviderDTO';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(RedisConfig.config);
  }

  public async save({ key, value }: ICacheProviderDTO): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recovery<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    // Aqui estou transformando o JSON que foi salvo la no redis em objeto de string's.
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    // remover key.
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // deletar todos as key que foi passado o prefix.
    // a varivel "keys", vai armazenar todos as keys que foi encontrada pelo prefixo.
    const keys = await this.client.keys(`${prefix}:*`);

    // deletando as keys.
    // iniciando um pipeline no redis.
    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.del(key)
    });

    // precisamos executar essa pipilene, para fazer as alterações la no redis.
    await pipeline.exec();
  }

}

export default RedisCacheProvider;