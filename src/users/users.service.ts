import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOptions } from 'sequelize';
import { PagenationQuery } from './interfaces/query.interface';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';

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
        currentPage: page,
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
    try {
      user.firstName = updateUserDto.firstName ?? user.firstName;
      user.lastName = updateUserDto.lastName ?? user.lastName;
      user.email = updateUserDto.email ?? user.email;
      user.age = updateUserDto.age ?? user.age;
      user.isActive = updateUserDto.isActive ?? user.isActive;
      user.password = updateUserDto.password ?? user.password;
      user.role = updateUserDto.role ?? user.role;
      user.refreshToken = updateUserDto.refreshToken ?? user.refreshToken;

      if (updateUserDto.password) {
        user.password = updateUserDto.password;
        user.changed('password', true);
      }
      await user.save({ hooks: true });
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.errors[0].message);
    }
  }
  async findByToken(token: string) {
    const refreshToken = token;
    if (!token) throw new NotFoundException('No token found!');
    const user = await this.userModel.findOne({
      where: { refreshToken },
    });
    console.log(token);
    if (!user) throw new NotFoundException('No users found!');
    return user;
  }
  async validateUser(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.userModel.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid email or password!');
    if (!user.comparePassword(password))
      throw new UnauthorizedException('Invalid email or password!');
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
