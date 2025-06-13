import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { log } from 'console';
import { Log } from 'src/entity/logger.entity';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class DatabaseLogger extends Logger {
  constructor(@InjectModel(Log) private logModel: typeof Log) {
    super();
  }
  async logToTheDatabase(level: string, message: string) {
    await this.logModel.create({
      level,
      message,
      request_id: '',
    });
  }
  error(message: string) {
    super.error(message);
    this.logToTheDatabase('error', message);
  }
  verbose(message: string) {
    super.verbose(message);
    this.logToTheDatabase('verbose', message);
  }
  warn(message: string) {
    super.warn(message);
    this.logToTheDatabase('warn', message);
  }
  log(message: string) {
    super.log(message);
    this.logToTheDatabase('log', message);
  }

  debug(message: string) {
    super.debug(message);
    this.logToTheDatabase('debug', message);
  }
}
