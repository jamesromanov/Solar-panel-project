import { Model } from 'sequelize-typescript';
import { RequestCreatingAttributes } from '../interfaces/request.create';
import { User } from 'src/users/entities/user.entity';
export declare class Request extends Model<Request, RequestCreatingAttributes> {
    id: number;
    title: string;
    email: string;
    userId: number;
    subject: string;
    message: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
