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
exports.RequestsController = void 0;
const common_1 = require("@nestjs/common");
const requests_service_1 = require("./requests.service");
const create_request_dto_1 = require("./dto/create-request.dto");
const update_request_dto_1 = require("./dto/update-request.dto");
const query_interface_1 = require("../users/interfaces/query.interface");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../auth/rolesguard/role.guard");
const roles_decorator_1 = require("../auth/rolesguard/roles.decorator");
const user_role_1 = require("../user.role");
let RequestsController = class RequestsController {
    requestsService;
    constructor(requestsService) {
        this.requestsService = requestsService;
    }
    create(createRequestDto) {
        return this.requestsService.create(createRequestDto);
    }
    findAll(query) {
        return this.requestsService.findAll(query);
    }
    findOne(id) {
        return this.requestsService.findOne(id);
    }
    update(id, updateRequestDto) {
        return this.requestsService.update(id, updateRequestDto);
    }
    remove(id, res) {
        return this.requestsService.remove(id, res);
    }
};
exports.RequestsController = RequestsController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Adds new request!',
        description: 'This method adds new request!',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Successfully added!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN, user_role_1.UserRole.USER),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", void 0)
], RequestsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns requests!',
        description: 'This method returns requests!',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully returned!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'number' }),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_interface_1.PaginationQuery]),
    __metadata("design:returntype", void 0)
], RequestsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns request by their id!',
        description: 'This method returns request by their id!',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully returned!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN, user_role_1.UserRole.USER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RequestsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Updates requests by id!',
        description: 'This method updates request by their id!',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully updated!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN, user_role_1.UserRole.USER),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_request_dto_1.UpdateRequestDto]),
    __metadata("design:returntype", void 0)
], RequestsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Deletes request by id!',
        description: 'This method deletes requests by their id!',
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Successfully deleted!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN, user_role_1.UserRole.USER),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], RequestsController.prototype, "remove", null);
exports.RequestsController = RequestsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('requests'),
    __metadata("design:paramtypes", [requests_service_1.RequestsService])
], RequestsController);
//# sourceMappingURL=requests.controller.js.map