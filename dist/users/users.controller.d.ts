import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQuery } from './interfaces/query.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
        _attributes: import("./entities/user.entity").User;
        dataValues: import("./entities/user.entity").User;
        _creationAttributes: import("./interfaces/user.creation").UserCreationAttrs;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("./entities/user.entity").User, import("./interfaces/user.creation").UserCreationAttrs>;
    }>;
    findAll(query: PaginationQuery): Promise<{
        totalPages: number;
        totalUsersCount: number;
        currentPage: number;
        hasNextPage: boolean;
        totalUsers: any[];
    }>;
    findOne(id: number): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: number): Promise<string>;
}
