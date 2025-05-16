import { UserRole } from 'src/user.role';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    role: UserRole;
    isActive: boolean;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
}
