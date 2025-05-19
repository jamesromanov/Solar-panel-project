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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register(createAuthDto) {
        return this.authService.register(createAuthDto);
    }
    login(loginDto, res) {
        return this.authService.login(loginDto, res);
    }
    refresh(req, res) {
        return this.authService.refresh(req, res);
    }
    logout(req, res) {
        return this.authService.logout(req, res);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Registers user!',
        description: 'This method registers user!',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully registered!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Loggin user!',
        description: 'This method is for loggin in!',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully logged in!' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginAuthDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get accessToken!',
        description: 'This method refreshes accessToken by refreshToken',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully refreshed!' }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Inalid data entered or token is invalid',
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Logout user!',
        description: 'This method is for user logout!',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully logged out!' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Invalid token!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map