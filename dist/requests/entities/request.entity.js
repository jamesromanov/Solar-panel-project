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
exports.Request = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_typescript_2 = require("sequelize-typescript");
const user_entity_1 = require("../../users/entities/user.entity");
let Request = class Request extends sequelize_typescript_1.Model {
    user;
};
exports.Request = Request;
__decorate([
    sequelize_typescript_2.PrimaryKey,
    sequelize_typescript_2.AutoIncrement,
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.BIGINT }),
    __metadata("design:type", Number)
], Request.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Request.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Request.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_2.ForeignKey)(() => user_entity_1.User),
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.BIGINT }),
    __metadata("design:type", Number)
], Request.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING }),
    __metadata("design:type", String)
], Request.prototype, "subject", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.STRING }),
    __metadata("design:type", String)
], Request.prototype, "message", void 0);
__decorate([
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.BOOLEAN, defaultValue: true }),
    __metadata("design:type", Boolean)
], Request.prototype, "active", void 0);
__decorate([
    sequelize_typescript_2.CreatedAt,
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.DATE }),
    __metadata("design:type", Date)
], Request.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_2.UpdatedAt,
    (0, sequelize_typescript_2.Column)({ type: sequelize_typescript_2.DataType.DATE }),
    __metadata("design:type", Date)
], Request.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_2.BelongsTo)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Request.prototype, "user", void 0);
exports.Request = Request = __decorate([
    (0, sequelize_typescript_2.Table)({
        tableName: 'requests',
        timestamps: true,
        defaultScope: { where: { active: true } },
    })
], Request);
//# sourceMappingURL=request.entity.js.map