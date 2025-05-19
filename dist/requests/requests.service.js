"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const request_entity_1 = require("./entities/request.entity");
const redis_service_1 = require("../redis/redis.service");
const logger_service_1 = require("../auth/logger.service");
let RequestsService = class RequestsService {
    requestModel;
    redisService;
    logger;
    constructor(requestModel, redisService, logger) {
        this.requestModel = requestModel;
        this.redisService = redisService;
        this.logger = logger;
    }
    async create(createRequestDto) {
        const request = await this.requestModel.create(createRequestDto);
        await this.redisService.del('request:all');
        return request;
    }
    async findAll(query) {
        const limit = Number(query.limit) || 10;
        const page = Number(query.page) || 1;
        const offset = (page - 1) * limit;
        const findOptions = {
            limit,
            offset,
        };
        const requestsAll = await this.redisService.get(`requests:page:${page}`);
        const requestsAllCount = await this.redisService.get(`requests:total`);
        let requests;
        let requestCount;
        const { rows: totalRequests, count: totalRequestsCount } = await this.requestModel.findAndCountAll({
            ...findOptions,
            where: { ...findOptions.where, active: true },
        });
        if (requestsAllCount && requestsAll) {
            requests = JSON.parse(requestsAll);
            requestCount = +requestsAllCount;
        }
        else {
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
    async findOne(id) {
        if (id < 1 || isNaN(id))
            throw new common_1.BadRequestException('Invalid id!');
        const cacheRequest = await this.redisService.get(`request:id:${id}`);
        if (cacheRequest)
            return JSON.parse(cacheRequest);
        const request = await this.requestModel.findByPk(id);
        if (!request)
            throw new common_1.NotFoundException('Request not found!');
        await this.redisService.set(`request:id:${id}`, request, 60);
        return request;
    }
    async update(id, updateRequestDto) {
        if (id < 1 || isNaN(id))
            throw new common_1.BadRequestException('Invalid id.');
        const request = await this.requestModel.findByPk(id);
        if (request) {
            await request.update({ ...updateRequestDto });
            await this.redisService.del(`request:id:${id}`);
            return request;
        }
        else
            throw new common_1.NotFoundException('Request not found.');
    }
    async remove(id, res) {
        if (id < 1 || isNaN(id))
            throw new common_1.BadRequestException('Invalid id');
        const request = await this.requestModel.findByPk(id);
        if (request) {
            await request.update({ active: false });
            await this.redisService.del(`request:id:${id}`);
            return res.status(common_1.HttpStatus.NO_CONTENT).json(null);
        }
        else {
            throw new common_1.NotFoundException('Request not found');
        }
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(request_entity_1.Request)),
    __metadata("design:paramtypes", [Object, redis_service_1.RedisService,
        logger_service_1.DatabaseLogger])
], RequestsService);
//# sourceMappingURL=requests.service.js.map