"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    client;
    async onModuleInit() {
        if (!process.env.REDIS_HOST || !process.env.REDIS_PORT)
            throw new common_1.NotFoundException('Couldnt load environment variables!');
        this.client = new ioredis_1.default({
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
    async llen(key) {
        return await this.client.llen(key);
    }
    async get(key) {
        return await this.client.get(key);
    }
    async set(key, value, expire) {
        if (expire)
            return await this.client.set(key, JSON.stringify(value), 'EX', expire);
        else
            return await this.client.set(key, JSON.stringify(value));
    }
    async del(key) {
        return await this.client.del(key);
    }
    async rpush(key, value) {
        return await this.client.rpush(key, ...value);
    }
    async lrange(key, start, end) {
        return await this.client.lrange(key, start, end);
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redis.service.js.map