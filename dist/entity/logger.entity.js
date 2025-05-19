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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
let Log = class Log extends sequelize_typescript_1.Model {
};
exports.Log = Log;
__decorate([
    sequelize_typescript_2.PrimaryKey,
    sequelize_typescript_2.AutoIncrement,
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.BIGINT }),
    __metadata("design:type", Number)
], Log.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING }),
    __metadata("design:type", String)
], Log.prototype, "level", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING }),
    __metadata("design:type", String)
], Log.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.DATE, defaultValue: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Log.prototype, "timmstamp", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], Log.prototype, "trace", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING }),
    __metadata("design:type", String)
], Log.prototype, "request_id", void 0);
exports.Log = Log = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'logs' })
], Log);
//# sourceMappingURL=logger.entity.js.map