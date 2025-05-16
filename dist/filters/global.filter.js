"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalFilter = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const getSequelizeError_1 = require("../utils/getSequelizeError");
let GlobalFilter = class GlobalFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message =
                typeof res === 'string' ? res : res.message || 'Requst failed';
        }
        else if (exception instanceof sequelize_1.BaseError) {
            message = (0, getSequelizeError_1.getSequelizeError)(exception);
            status = common_1.HttpStatus.BAD_REQUEST;
        }
        response.status(status).json({
            success: false,
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
exports.GlobalFilter = GlobalFilter;
exports.GlobalFilter = GlobalFilter = __decorate([
    (0, common_1.Catch)()
], GlobalFilter);
//# sourceMappingURL=global.filter.js.map