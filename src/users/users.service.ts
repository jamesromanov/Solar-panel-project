import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOptions } from 'sequelize';
import { PagenationQuery } from './interfaces/query.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      return user.toJSON();
    } catch (error) {
      throw new BadRequestException(error.errors[0].message);
    }
  }

  async findAll(query: PagenationQuery) {
    try {
      const limit = Number(query.limit) || 10;
      const page = Number(query.page) || 1;

      const offset = (page - 1) * limit;
      const findOptions: FindOptions = {
        limit,
        offset,
      };
      const { rows: totalUsers, count: totalUsersCount } =
        await this.userModel.findAndCountAll({
          ...findOptions,
          where: { ...findOptions.where, isActive: true },
        });
      const totalPages = Math.ceil(totalUsersCount / limit);
      return {
        totalPages,
        totalUsersCount,
        hasNextPage: page < totalPages,
        totalUsers,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const user = await this.userModel.findOne({
      where: { id, isActive: true },
    });
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const user = await this.userModel.findOne({
      where: { id, isActive: true },
    });
    if (!user) throw new NotFoundException('User not found!');
    user.firstName = updateUserDto.firstName ?? user.firstName;
    user.lastName = updateUserDto.lastName ?? user.lastName;
    user.email = updateUserDto.email ?? user.email;
    user.age = updateUserDto.age ?? user.age;
    user.isActive = updateUserDto.isActive ?? user.isActive;
    user.password = updateUserDto.password ?? user.password;
    user.role = updateUserDto.role ?? user.role;

    if (updateUserDto.password) {
      user.password = updateUserDto.password;
      user.changed('password', true);
    }
    await user.save({ hooks: true });
    return user;
  }

  async remove(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const user = await this.userModel.findOne({
      where: { id, isActive: true },
    });
    if (!user) throw new NotFoundException('User not found!');
    user.isActive = false;
    await user.save({ hooks: true });
    return 'Successfully deleted!';
  }
}
