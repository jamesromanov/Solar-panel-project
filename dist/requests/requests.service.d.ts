import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { RedisService } from 'src/redis/redis.service';
import { PaginationQuery } from 'src/users/interfaces/query.interface';
import { Response } from 'express';
import { DatabaseLogger } from 'src/auth/logger.service';
export declare class RequestsService {
    private requestModel;
    private redisService;
    private logger;
    constructor(requestModel: typeof Request, redisService: RedisService, logger: DatabaseLogger);
    create(createRequestDto: CreateRequestDto): Promise<Request>;
    findAll(query: PaginationQuery): Promise<{
        totalPages: number;
        totalRequests: number;
        hasNextPage: boolean;
        currentPage: number;
        requests: any[];
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateRequestDto: UpdateRequestDto): Promise<Request>;
    remove(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
