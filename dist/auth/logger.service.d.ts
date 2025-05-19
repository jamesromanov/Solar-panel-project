import { Logger } from '@nestjs/common';
import { Log } from 'src/entity/logger.entity';
export declare class DatabaseLogger extends Logger {
    private logModel;
    constructor(logModel: typeof Log);
    logToTheDatabase(level: string, message: string): Promise<void>;
    error(message: string): void;
    verbose(message: string): void;
    warn(message: string): void;
    log(message: string): void;
    debug(message: string): void;
}
