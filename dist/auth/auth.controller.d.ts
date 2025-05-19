import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAuthDto: CreateAuthDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        age: number;
        email: string;
        role: import("../user.role").UserRole;
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
    login(loginDto: LoginAuthDto, res: Response): Promise<string>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(req: Request, res: Response): Promise<string>;
}
