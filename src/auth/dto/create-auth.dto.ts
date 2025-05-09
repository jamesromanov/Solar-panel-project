import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../../user.role';

export class CreateAuthDto {
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
  email: string;
  @ApiProperty({
    description: 'role of the user',
    type: 'string',
    required: true,
    default: 'USER',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsEnum(UserRole)
  role: UserRole;
  @ApiProperty({
    description: 'Status of the user!',
    type: 'boolean',
    default: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean = true;
  @ApiProperty({ description: 'Time user registered!' })
  @IsString()
  createdAt: string;
  @ApiProperty({ description: 'Time that user updated!' })
  @IsString()
  updatedAt: string;
}
