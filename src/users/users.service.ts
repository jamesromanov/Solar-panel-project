import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOptions } from 'sequelize';
import { PaginationQuery } from './interfaces/query.interface';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private redisService: RedisService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.redisService.del('users:all');
    const user = await this.userModel.create(createUserDto);
    return user.toJSON();
  }

  async findAll(query: PaginationQuery) {
    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;

    const offset = (page - 1) * limit;
    const findOptions: FindOptions = {
      limit,
      offset,
    };
    const usersAll = await this.redisService.get(`users:list:page:${page}`);
    const usersTotalCount = await this.redisService.get('users:list:total');

    let users: any[];
    let usersCount: number;

    const { rows: totalUsers, count: totalUsersCount } =
      await this.userModel.findAndCountAll({
        ...findOptions,
        where: { ...findOptions.where, isActive: true },
      });

    if (usersAll && usersTotalCount) {
      users = JSON.parse(usersAll);
      usersCount = +usersTotalCount;
    } else {
      users = totalUsers;
      usersCount = totalUsersCount;
    }

    const totalPages = Math.ceil(usersCount / limit);

    if (totalUsers.length > 0 && totalUsersCount >= 1) {
      await this.redisService.set(`users:list:page:${page}`, totalUsers, 60);
      await this.redisService.set(`users:list:total`, totalUsersCount, 60);
    }
    return {
      totalPages,
      totalUsersCount: usersCount,
      currentPage: page,
      hasNextPage: page < totalPages,
      totalUsers: users,
    };
  }

  async findOne(id: number) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const userCache = await this.redisService.get(`users:id:${id}`);
    if (userCache) return JSON.parse(userCache);
    const user = await this.userModel.findOne({
      where: { id, isActive: true },
    });
    if (!user) throw new NotFoundException('User not found!');
    await this.redisService.set(`users:id:${id}`, user, 60);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (id < 1 || isNaN(id)) throw new BadRequestException('Invalid id!');
    const user = await this.userModel.findOne({
      where: { id, isActive: true },
    });
    if (!user) throw new NotFoundException('User not found!');
    await this.redisService.del(`users:id:${id}`);
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
    await this.redisService.set(`users:id:${id}`, user, 60);
    return user;
  }
  async findByToken(token: string) {
    const refreshToken = token;
    if (!token) throw new NotFoundException('No token found!');
    const userCache = await this.redisService.get(
      `users:refresh:${refreshToken}`,
    );
    if (userCache) return JSON.parse(userCache);
    const user = await this.userModel.findOne({
      where: { refreshToken },
    });
    if (!user) throw new NotFoundException('No users found!');
    await this.redisService.set(`users:refresh:${refreshToken}`, user, 60);
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
    await this.redisService.del(`users:id:${id}`);
    await user.save({ hooks: true });
    return 'Successfully deleted!';
  }
}
