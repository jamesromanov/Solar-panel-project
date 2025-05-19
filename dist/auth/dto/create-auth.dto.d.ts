import { UserRole } from '../../user.role';
export declare class CreateAuthDto {
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
