import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PaginationQuery } from 'src/users/interfaces/query.interface';
import { Response } from 'express';
export declare class RequestsController {
    private readonly requestsService;
    constructor(requestsService: RequestsService);
    create(createRequestDto: CreateRequestDto): Promise<import("./entities/request.entity").Request>;
    findAll(query: PaginationQuery): Promise<{
        totalPages: number;
        totalRequests: number;
        hasNextPage: boolean;
        currentPage: number;
        requests: any[];
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateRequestDto: UpdateRequestDto): Promise<import("./entities/request.entity").Request>;
    remove(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
