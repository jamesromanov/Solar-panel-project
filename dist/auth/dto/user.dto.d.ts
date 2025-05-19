import { UserRole } from 'src/user.role';
export declare class UserDto {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
