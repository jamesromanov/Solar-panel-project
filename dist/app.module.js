"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const requests_module_1 = require("./requests/requests.module");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const throttler_1 = require("@nestjs/throttler");
const throttler_storage_redis_1 = require("@nest-lab/throttler-storage-redis");
const ioredis_1 = require("ioredis");
const redis_module_1 = require("./redis/redis.module");
const core_1 = require("@nestjs/core");
const global_filter_1 = require("./filters/global.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            users_module_1.UsersModule,
            throttler_1.ThrottlerModule.forRoot({
                throttlers: [{ ttl: 1000 * 60, limit: 5 }],
                storage: new throttler_storage_redis_1.ThrottlerStorageRedisService(new ioredis_1.default({
                    port: Number(process.env.REDIS_PORT) || 6379,
                    host: process.env.REDIS_HOST,
                })),
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                useFactory: () => ({
                    dialect: 'postgres',
                    uri: process.env.DB_URL,
                    synchronize: true,
                    autoLoadModels: true,
                }),
            }),
            auth_module_1.AuthModule,
            requests_module_1.RequestsModule,
            redis_module_1.RedisModule,
        ],
        controllers: [],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: global_filter_1.GlobalFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map