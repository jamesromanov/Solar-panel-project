import { CreateUserDto } from './create-user.dto';
import { UserRole } from 'src/user.role';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    role: UserRole;
    isActive: boolean;
    refreshToken: string;
}
export {};
