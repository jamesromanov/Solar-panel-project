import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LegacyESLint } from 'eslint/use-at-your-own-risk';
import e from 'express';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  async onModuleInit() {
    if (!process.env.REDIS_HOST || !process.env.REDIS_PORT)
      throw new NotFoundException('Couldnt load environment variables!');
    this.client = new Redis({
      port: +process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
    });

    this.client.on('connect', () => {
      console.log('Redis connected successfully!✅');
    });
    this.client.on('error', (err) => {
      console.log('Redis connection error!❌', err);
    });
  }
  async llen(key: string) {
    return await this.client.llen(key);
  }

  async get(key: string) {
    return await this.client.get(key);
  }
  async set(key: string, value: any, expire?: number) {
    if (expire)
      return await this.client.set(key, JSON.stringify(value), 'EX', expire);
    else return await this.client.set(key, JSON.stringify(value));
  }
  async del(key: string) {
    return await this.client.del(key);
  }
  async rpush(key: string, value: any) {
    return await this.client.rpush(key, ...value);
  }
  async lrange(key: string, start: any, end: any) {
    return await this.client.lrange(key, start, end);
  }
}
