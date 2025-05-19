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
exports.LoginAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginAuthDto {
    email;
    password;
}
exports.LoginAuthDto = LoginAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the user!',
        type: 'string',
        default: 'Someone@gmail.com',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The password of the user!',
        type: 'string',
        default: 'some_string_password',
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
<<<<<<< HEAD
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
=======
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one symbol',
>>>>>>> e66bc828 (finished project added roles guard)
    }),
    __metadata("design:type", String)
], LoginAuthDto.prototype, "password", void 0);
//# sourceMappingURL=login-auth.dto.js.map