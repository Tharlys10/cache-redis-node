import cache from "@config/cache";
import Redis, { Redis as RedisClient } from 'ioredis';
import { ICacheProvider } from "../ICacheProvider";

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cache.config.redis);
  }

  async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    const parseData = JSON.parse(data) as T;

    return parseData;
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  } 
}

export { RedisCacheProvider }