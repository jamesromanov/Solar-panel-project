import { DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt';

import {
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserRole } from 'src/user.role';
import { UserCreationAttrs } from '../interfaces/user.creation';
@Table({
  tableName: 'users',
  timestamps: true,
  defaultScope: { where: { isActive: true } },
})
export class User extends Model<User, UserCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataTypes.BIGINT,
  })
  declare readonly id: number;
  @Column({ type: DataTypes.STRING, allowNull: false })
  declare firstName: string;
  @Column({ type: DataTypes.STRING, allowNull: false })
  declare lastName: string;
  @Column({ type: DataTypes.INTEGER })
  declare age: number;
  @Column({ type: DataTypes.STRING, allowNull: false, unique: true })
  declare email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;
  @Column({ type: DataTypes.ENUM(UserRole.USER, UserRole.ADMIN) })
  declare role: UserRole;
  @Column({ type: DataTypes.BOOLEAN, defaultValue: true })
  declare isActive: boolean;
  @Column({ type: DataType.DATE, allowNull: true })
  declare readonly createdAt: Date;
  @Column({ type: DataType.DATE, allowNull: true })
  declare readonly updatedAt: Date;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    const rawPassword = await user.getDataValue('password');
    if (rawPassword && user.changed('password')) {
      const hashed = await bcrypt.hash(rawPassword, 12);
      user.setDataValue('password', hashed);
    }
  }

  toJSON() {
    const { password, ...withoutPasswordData } = this.get();
    return withoutPasswordData;
  }

  async comparePassword(plainText: string) {
    return bcrypt.compare(plainText, this.password);
  }
}
