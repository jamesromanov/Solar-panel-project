import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException("Couldn't get the token!");

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      request['user'] = {
        id: payload.id,
        role: payload.role,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
  private extractTokenFromHeader(request: any) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(type === 'Bearer' ? token : undefined);
    return type === 'Bearer' ? token : undefined;
  }
}
