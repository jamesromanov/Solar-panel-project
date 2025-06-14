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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const query_interface_1 = require("./interfaces/query.interface");
const id_validtion_pipe_1 = require("./Pipes/id.validtion.pipe");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../auth/rolesguard/role.guard");
const roles_decorator_1 = require("../auth/rolesguard/roles.decorator");
const user_role_1 = require("../user.role");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll(query) {
        return this.usersService.findAll(query);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Adds a user!',
        description: 'This method adds a user!',
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'User created successfully!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data entered!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns users!',
        description: 'This method returns users!',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully got users!' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: 'number', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: 'number', required: false }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_interface_1.PaginationQuery]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Returns user by id!',
        description: 'This method returns user by id!',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully returned user!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', id_validtion_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Updates a user by id!',
        description: 'This method updated user by id!',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Updated successfully!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', id_validtion_pipe_1.ValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Deleted or deactivates user!',
        description: 'This method deletes user by their id!',
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Deleted successfully!' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id!' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: 'Internal server error!' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', id_validtion_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map