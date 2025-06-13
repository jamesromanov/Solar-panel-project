import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from 'sequelize';
import { getSequelizeError } from 'src/utils/getSequelizeError';

@Catch()
export class GlobalFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // if no error status mathches or if the error was a server error
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    //  any other error that comes from the datagbase or anything this will respond
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string' ? res : (res as any).message || 'Requst failed';
    } else if (exception instanceof BaseError) {
      message = getSequelizeError(exception);
      status = HttpStatus.BAD_REQUEST;
    }
    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

// instead of the unique error or any other database of the sequelize error BaseError is the groupt of them
// //  exception instanceof ValidationError||
// exception instanceof UniqueConstraintError ||
// // kinda just added this so that could be
// exception instanceof DatabaseError
