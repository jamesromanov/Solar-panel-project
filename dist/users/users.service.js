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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("./entities/user.entity");
const redis_service_1 = require("../redis/redis.service");
let UsersService = class UsersService {
    userModel;
    redisService;
    constructor(userModel, redisService) {
        this.userModel = userModel;
        this.redisService = redisService;
    }
    async create(createUserDto) {
        await this.redisService.del('users:all');
        const user = await this.userModel.create(createUserDto);
        return user.toJSON();
    }
    async findAll(query) {
        const limit = Number(query.limit) || 10;
        const page = Number(query.page) || 1;
        const offset = (page - 1) * limit;
        const findOptions = {
            limit,
            offset,
        };
        const usersAll = await this.redisService.get(`users:list:page:${page}`);
        const usersTotalCount = await this.redisService.get('users:list:total');
        let users;
        let usersCount;
        const { rows: totalUsers, count: totalUsersCount } = await this.userModel.findAndCountAll({
            ...findOptions,
            where: { ...findOptions.where, isActive: true },
        });
        if (usersAll && usersTotalCount) {
            users = JSON.parse(usersAll);
            usersCount = +usersTotalCount;
        }
        else {
            users = totalUsers;
            usersCount = totalUsersCount;
        }
        const totalPages = Math.ceil(usersCount / limit);
        if (totalUsers.length > 0 && totalUsersCount >= 1) {
            await this.redisService.set(`users:list:page:${page}`, totalUsers, 60);
            await this.redisService.set(`users:list:total`, totalUsersCount, 60);
        }
        return {
            totalPages,
            totalUsersCount: usersCount,
            currentPage: page,
            hasNextPage: page < totalPages,
            totalUsers: users,
        };
    }
    async findOne(id) {
        if (id < 1 || isNaN(id))
            throw new common_1.BadRequestException('Invalid id!');
        const userCache = await this.redisService.get(`users:id:${id}`);
        if (userCache)
            return JSON.parse(userCache);
        const user = await this.userModel.findOne({
            where: { id, isActive: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        await this.redisService.set(`users:id:${id}`, user, 60);
        return user;
    }
    async update(id, updateUserDto) {
        if (id < 1 || isNaN(id))
            throw new common_1.BadRequestException('Invalid id!');
        const user = await this.userModel.findOne({
            where: { id, isActive: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        await this.redisService.del(`users:id:${id}`);
        user.firstName = updateUserDto.firstName ?? user.firstName;
        user.lastName = updateUserDto.lastName ?? user.lastName;
        user.email = updateUserDto.email ?? user.email;
        user.age = updateUserDto.age ?? user.age;
        user.isActive = updateUserDto.isActive ?? user.isActive;
        user.password = updateUserDto.password ?? user.password;
        user.role = updateUserDto.role ?? user.role;
        user.refreshToken = updateUserDto.refreshToken ?? user.refreshToken;
        if (updateUserDto.password) {
            user.password = updateUserDto.password;
            user.changed('password', true);
        }
        await user.save({ hooks: true });
        await this.redisService.set(`users:id:${id}`, user, 60);
        return user;
    }
    async findByToken(token) {
        const refreshToken = token;
        if (!token)
            throw new common_1.NotFoundException('No token found!');
        const userCache = await this.redisService.get(`users:refresh:${refreshToken}`);
        if (userCache)
            return JSON.parse(userCache);
        const user = await this.userModel.findOne({
            where: { refreshToken },
        });
        if (!user)
            throw new common_1.NotFoundException('No users found!');
        await this.redisService.set(`users:refresh:${refreshToken}`, user, 60);
        return user;
    }
    async validateUser(loginAuthDto) {
        const { email, password } = loginAuthDto;
        const user = await this.userModel.findOne({ where: { email } });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid email or password!');
        if (!user.comparePassword(password))
            throw new common_1.UnauthorizedException('Invalid email or password!');
        return user;
    }
    async remove(id) {
        if (id < 1 || isNaN(id))
            throw new common_1.BadRequestException('Invalid id!');
        const user = await this.userModel.findOne({
            where: { id, isActive: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found!');
        user.isActive = false;
        await this.redisService.del(`users:id:${id}`);
        await user.save({ hooks: true });
        return 'Successfully deleted!';
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, redis_service_1.RedisService])
], UsersService);
//# sourceMappingURL=users.service.js.map