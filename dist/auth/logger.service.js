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
exports.DatabaseLogger = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const logger_entity_1 = require("../entity/logger.entity");
let DatabaseLogger = class DatabaseLogger extends common_1.Logger {
    logModel;
    constructor(logModel) {
        super();
        this.logModel = logModel;
    }
    async logToTheDatabase(level, message) {
        await this.logModel.create({
            level,
            message,
            request_id: '',
        });
    }
    error(message) {
        super.error(message);
        this.logToTheDatabase('error', message);
    }
    verbose(message) {
        super.verbose(message);
        this.logToTheDatabase('verbose', message);
    }
    warn(message) {
        super.warn(message);
        this.logToTheDatabase('warn', message);
    }
    log(message) {
        super.log(message);
        this.logToTheDatabase('log', message);
    }
    debug(message) {
        super.debug(message);
        this.logToTheDatabase('debug', message);
    }
};
exports.DatabaseLogger = DatabaseLogger;
exports.DatabaseLogger = DatabaseLogger = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.TRANSIENT,
    }),
    __param(0, (0, sequelize_1.InjectModel)(logger_entity_1.Log)),
    __metadata("design:paramtypes", [Object])
], DatabaseLogger);
//# sourceMappingURL=logger.service.js.map