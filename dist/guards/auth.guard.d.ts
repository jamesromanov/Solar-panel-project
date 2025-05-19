import { CanActivate, ExecutionContext } from '@nestjs/common';
<<<<<<< HEAD
import { Observable } from 'rxjs';
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
=======
import { JwtService } from '@nestjs/jwt';
export declare class AuthGuard implements CanActivate {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
>>>>>>> e66bc828 (finished project added roles guard)
}
