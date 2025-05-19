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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userSerivce;
    jwtService;
    constructor(userSerivce, jwtService) {
        this.userSerivce = userSerivce;
        this.jwtService = jwtService;
    }
    async register(createAuthDto) {
        return await this.userSerivce.create(createAuthDto);
    }
    async login(loginAuthDto, res) {
        const user = await this.userSerivce.validateUser(loginAuthDto);
        const payload = { id: user.id, role: user.role };
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: process.env.REFRESH_TOKEN_EXP,
        });
        res.cookie('jwt', refreshToken, {
            maxAge: parseInt('604800000'),
            httpOnly: true,
            secure: true,
        });
        user.refreshToken = refreshToken;
        await user.save({ hooks: true });
        return 'Logged in succesfully';
    }
    async refresh(req, res) {
        const refreshToken = req.cookies.jwt;
        try {
            const validation = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.REFRESH_TOKEN_KEY,
            });
            const user = await this.userSerivce.findByToken(refreshToken);
            if (user.id !== validation.id)
                throw new common_1.UnauthorizedException('Token is invalid!');
            const payload = { id: user.id, role: user.role };
            const accessToken = await this.jwtService.signAsync(payload, {
                secret: process.env.ACCESS_TOKEN_KEY,
                expiresIn: process.env.ACCESS_TOKEN_EXP,
            });
            return { accessToken };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async logout(req, res) {
        const refreshToken = req.cookies.jwt;
        try {
            const validation = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.REFRESH_TOKEN_KEY,
            });
            console.log(validation.id);
            const user = await this.userSerivce.findByToken(refreshToken);
            if (user.id !== validation.id)
                throw new common_1.UnauthorizedException('Token is invalid!');
            user.refreshToken = null;
            await user.save({ hooks: true });
            res.clearCookie('jwt', {
                maxAge: parseInt('604800000'),
                httpOnly: true,
                secure: true,
            });
            return 'Logged out successfully!';
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map