import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import Redis from 'ioredis';
import { RedisModule } from './redis/redis.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalFilter } from './filters/global.filter';
import { DatabaseLogger } from './auth/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 1000 * 60, limit: 5 }],
      storage: new ThrottlerStorageRedisService(
        new Redis({
          port: Number(process.env.REDIS_PORT) || 6379,
          host: process.env.REDIS_HOST,
        }),
      ),
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        uri: process.env.DB_URL,
        synchronize: true,
        autoLoadModels: true,
      }),
    }),
    AuthModule,
    RequestsModule,
    RedisModule,
  ],
  controllers: [],
  providers: [
    AppService,
    // {
    //   provide: APP_LOGGER,
    //   useClass: DatabaseLogger,
    // },
    {
      provide: APP_FILTER,
      useClass: GlobalFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
