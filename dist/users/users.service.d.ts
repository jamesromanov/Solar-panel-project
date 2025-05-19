import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationQuery } from './interfaces/query.interface';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RedisService } from 'src/redis/redis.service';
export declare class UsersService {
    private userModel;
    private redisService;
    constructor(userModel: typeof User, redisService: RedisService);
    create(createUserDto: CreateUserDto): Promise<{
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
        _attributes: User;
        dataValues: User;
        _creationAttributes: import("./interfaces/user.creation").UserCreationAttrs;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<User, import("./interfaces/user.creation").UserCreationAttrs>;
    }>;
    findAll(query: PaginationQuery): Promise<{
        totalPages: number;
        totalUsersCount: number;
        currentPage: number;
        hasNextPage: boolean;
        totalUsers: any[];
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    findByToken(token: string): Promise<any>;
    validateUser(loginAuthDto: LoginAuthDto): Promise<User>;
    remove(id: number): Promise<string>;
}
