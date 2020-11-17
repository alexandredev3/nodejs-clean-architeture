import ICacheProviderDTO from '@shared/container/providers/CacheProvider/dtos/ICacheProviderDTO';

export default interface ICacheProvider {
  save(data: ICacheProviderDTO): Promise<void>;
  recovery<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}