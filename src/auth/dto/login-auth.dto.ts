import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'The email of the user!',
    type: 'string',
    default: 'Someone@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'The password of the user!',
    type: 'string',
    default: 'some_string_password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one symbol',
  })
  password: string;
}
