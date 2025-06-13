import { Model, Table } from 'sequelize-typescript';
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';
import { LoggerAttributes } from 'src/auth/logger.attrubutes';
@Table({ tableName: 'logs' })
export class Log extends Model<Log, LoggerAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.BIGINT })
  declare id: number;
  @Column({ type: DataType.STRING })
  declare level: string;
  @Column({ type: DataType.STRING })
  declare message: string;
  @Column({ type: DataType.DATE, defaultValue: 'CURRENT_TIMESTAMP' })
  declare timmstamp: Date;
  @Column({ type: DataType.STRING, allowNull: true })
  declare trace: string;
  @Column({ type: DataType.STRING })
  declare request_id: string;
}
