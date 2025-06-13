import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Registers user!',
    description: 'This method registers user!',
  })
  @ApiCreatedResponse({ description: 'Successfully registered!' })
  @ApiBadRequestResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }
  @ApiOperation({
    summary: 'Loggin user!',
    description: 'This method is for loggin in!',
  })
  @ApiCreatedResponse({ description: 'Successfully logged in!' })
  @ApiUnauthorizedResponse({ description: 'Invalid data entered!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Post('login')
  login(
    @Body() loginDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }
  @ApiOperation({
    summary: 'Get accessToken!',
    description: 'This method refreshes accessToken by refreshToken',
  })
  @ApiCreatedResponse({ description: 'Successfully refreshed!' })
  @ApiUnauthorizedResponse({
    description: 'Inalid data entered or token is invalid',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }
  @ApiOperation({
    summary: 'Logout user!',
    description: 'This method is for user logout!',
  })
  @ApiCreatedResponse({ description: 'Successfully logged out!' })
  @ApiUnauthorizedResponse({ description: 'Invalid token!' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error!' })
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
}
