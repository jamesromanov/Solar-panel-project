import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from './entities/request.entity';
import { RedisService } from 'src/redis/redis.service';
import { DatabaseLogger } from 'src/auth/logger.service';

@Module({
  imports: [SequelizeModule.forFeature([Request])],
  controllers: [RequestsController],
  providers: [RequestsService, RedisService, DatabaseLogger],
})
export class RequestsModule {}
