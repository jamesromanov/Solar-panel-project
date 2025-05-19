import { Model } from 'sequelize-typescript';
import { LoggerAttributes } from 'src/auth/logger.attrubutes';
export declare class Log extends Model<Log, LoggerAttributes> {
    id: number;
    level: string;
    message: string;
    timmstamp: Date;
    trace: string;
    request_id: string;
}
