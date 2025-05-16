"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsModule = void 0;
const common_1 = require("@nestjs/common");
const requests_service_1 = require("./requests.service");
const requests_controller_1 = require("./requests.controller");
const sequelize_1 = require("@nestjs/sequelize");
const request_entity_1 = require("./entities/request.entity");
const redis_service_1 = require("../redis/redis.service");
const logger_service_1 = require("../auth/logger.service");
let RequestsModule = class RequestsModule {
};
exports.RequestsModule = RequestsModule;
exports.RequestsModule = RequestsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([request_entity_1.Request])],
        controllers: [requests_controller_1.RequestsController],
        providers: [requests_service_1.RequestsService, redis_service_1.RedisService, logger_service_1.DatabaseLogger],
    })
], RequestsModule);
//# sourceMappingURL=requests.module.js.map