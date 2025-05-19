import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserRole } from 'src/user.role';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userSerivce: UsersService,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    return await this.userSerivce.create(createAuthDto);
  }
  async login(loginAuthDto: LoginAuthDto, res: Response) {
    const user = await this.userSerivce.validateUser(loginAuthDto);
    const payload = { id: user.id, role: user.role };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_EXP,
    });

    res.cookie('jwt', refreshToken, {
      maxAge: parseInt('604800000'),
      httpOnly: true,
      secure: true,
    });

    user.refreshToken = refreshToken;
    await user.save({ hooks: true });
    return 'Logged in succesfully';
  }
  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.jwt;
    try {
      const validation = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.userSerivce.findByToken(refreshToken);
      if (user.id !== validation.id)
        throw new UnauthorizedException('Token is invalid!');

      const payload = { id: user.id, role: user.role };
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_EXP,
      });
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  async logout(req: Request, res: Response) {
    const refreshToken = req.cookies.jwt;
    try {
      const validation = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      console.log(validation.id);

      const user = await this.userSerivce.findByToken(refreshToken);
      if (user.id !== validation.id)
        throw new UnauthorizedException('Token is invalid!');

      user.refreshToken = null;
      await user.save({ hooks: true });
      res.clearCookie('jwt', {
        maxAge: parseInt('604800000'),
        httpOnly: true,
        secure: true,
      });
      return 'Logged out successfully!';
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
