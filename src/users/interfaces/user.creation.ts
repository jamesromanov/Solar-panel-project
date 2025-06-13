import { UserRole } from 'src/user.role';

export interface UserCreationAttrs {
  id?: number;
  firstName: string;
  lastName: string;
  age?: number;
  email: string;
  role?: UserRole;
  password: string;
  isActive?: boolean;
  refreshToken?: string;
}
