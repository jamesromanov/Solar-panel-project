import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserRole } from 'src/user.role';
export declare class AuthService {
    private userSerivce;
    private jwtService;
    constructor(userSerivce: UsersService, jwtService: JwtService);
    register(createAuthDto: CreateAuthDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        age: number;
        email: string;
        role: UserRole;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        requests: import("../requests/entities/request.entity").Request[];
        deletedAt?: Date | any;
        version?: number | any;
        _attributes: import("../users/entities/user.entity").User;
        dataValues: import("../users/entities/user.entity").User;
        _creationAttributes: import("../users/interfaces/user.creation").UserCreationAttrs;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../users/entities/user.entity").User, import("../users/interfaces/user.creation").UserCreationAttrs>;
    }>;
    login(loginAuthDto: LoginAuthDto, res: Response): Promise<string>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(req: Request, res: Response): Promise<string>;
}
