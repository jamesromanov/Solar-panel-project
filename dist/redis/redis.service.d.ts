import { OnModuleInit } from '@nestjs/common';
export declare class RedisService implements OnModuleInit {
    private client;
    onModuleInit(): Promise<void>;
    llen(key: string): Promise<number>;
    get(key: string): Promise<string | null>;
    set(key: string, value: any, expire?: number): Promise<"OK">;
    del(key: string): Promise<number>;
    rpush(key: string, value: any): Promise<number>;
    lrange(key: string, start: any, end: any): Promise<string[]>;
}
