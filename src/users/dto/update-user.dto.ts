import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { UserRole } from 'src/user.role';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'This is the first_name of the user!',
    type: 'string',
    required: true,
    default: 'someone',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({
    description: 'This is the last name of the user!',
    type: 'string',
    required: false,
    default: 'someone',
  })
  @IsString()
  @IsOptional()
  lastName: string;
  @ApiProperty({
    description: 'Email of the user',
    type: 'string',
    required: true,
    default: 'someone@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
  @ApiProperty({
    description: 'The password of the user!',
    type: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password!: string;
  @ApiProperty({
    description: 'The age of the user!',
    default: 15,
    type: 'number',
  })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(15)
  @Max(90)
  age: number;
  @ApiProperty({
    description: 'role of the user',
    type: 'string',
    required: true,
    default: 'USER',
  })
  @IsString()
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
  @ApiProperty({
    description: 'Status of the user!',
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;
  @IsString()
  @IsOptional()
  refreshToken: string;
}
