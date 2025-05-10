import { Module, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import Redis from 'ioredis';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 1000 * 60, limit: 4 }],
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
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
