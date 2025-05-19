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
exports.UpdateRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_request_dto_1 = require("./create-request.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateRequestDto extends (0, mapped_types_1.PartialType)(create_request_dto_1.CreateRequestDto) {
    title;
    email;
    userId;
    subject;
    message;
    active = true;
}
exports.UpdateRequestDto = UpdateRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Title of the request!',
        required: true,
        example: 'Some good title!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRequestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        required: true,
        description: 'Email of the user that is leaving the request!',
        example: 'someone@gmail.com',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        required: true,
        description: 'User of request!',
        example: 1,
    }),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Subject of the request!',
        example: 'This is summary exmaple text!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRequestDto.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        description: 'Message od the request!',
        example: 'Hi i wanna send this request to some one!',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateRequestDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateRequestDto.prototype, "active", void 0);
//# sourceMappingURL=update-request.dto.js.map