import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as env from 'dotenv';
env.config();

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXP },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
