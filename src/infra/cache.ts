
import Redis from 'ioredis';
import { config } from "../config/env";

const redis = new Redis(config.REDIS_URL);
export async function getCached<T>(key: string): Promise<T| null> {
  const v = await redis.get(key);
  return v ? JSON.parse(v) as T : null;
}
export async function setCached(key: string, value: any, ttl = 300) {
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
}
export default redis;
