import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class GlobalFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
