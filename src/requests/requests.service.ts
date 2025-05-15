import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from './entities/request.entity';
import { FindOptions } from 'sequelize';
import { RedisService } from 'src/redis/redis.service';
import { PaginationQuery } from 'src/users/interfaces/query.interface';
import { Response } from 'express';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private requestModel: typeof Request,
    private redisService: RedisService,
  ) {}
  async create(createRequestDto: CreateRequestDto) {
    const request = await this.requestModel.create(createRequestDto);
    await this.redisService.del('request:all');
    return request;
  }

  async findAll(query: PaginationQuery) {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const offset = (page - 1) * limit;
    const findOptions: FindOptions = {
      limit,
      offset,
    };
    const requestsAll = await this.redisService.get(`requests:page:${page}`);
    const requestsAllCount = await this.redisService.get(`requests:total`);

    let requests: any[];
    let requestCount: number;

    const { rows: totalRequests, count: totalRequestsCount } =
      await this.requestModel.findAndCountAll({
        ...findOptions,
        where: { ...findOptions.where, active: true },
      });

    if (requestsAllCount && requestsAll) {
      requests = JSON.parse(requestsAll);
      requestCount = +requestsAllCount;
    } else {
      requests = totalRequests;
      requestCount = totalRequestsCount;
    }

    if (totalRequests.length > 0 && totalRequestsCount >= 1) {
      await this.redisService.set(`requests:page:${page}`, totalRequests, 60);
      await this.redisService.set(`requests:total`, totalRequestsCount, 60);
    }
    const totalPages = Math.ceil(requestCount / limit);

    return {
      totalPages,
      totalRequests: requestCount,
      hasNextPage: page < totalPages,
      currentPage: page,
      requests,
    };
  }

  async findOne(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const request = await this.requestModel.findByPk(id);
    if (!request) throw new NotFoundException('Request not found!');
    return request;
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id.');
    const request = await this.requestModel.findByPk(id);
    if (request) return await request.update({ ...updateRequestDto });
    else throw new NotFoundException('Request not found.');
  }

  async remove(id: number, res: Response) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id');
    const request = await this.requestModel.findByPk(id);
    if (request) {
      await request.update({ active: false });
      return res.status(HttpStatus.NO_CONTENT).json(null);
    } else {
      throw new NotFoundException('Request not found');
    }
  }
}
