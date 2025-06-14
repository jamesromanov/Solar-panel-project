import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  @ApiProperty({
    type: 'string',
    description: 'Title of the request!',
    required: true,
    example: 'Some good title!',
  })
  @IsString()
  @IsOptional()
  title: string;
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Email of the user that is leaving the request!',
    example: 'someone@gmail.com',
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
  @ApiProperty({
    type: 'number',
    required: true,
    description: 'User of request!',
    example: 1,
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  userId: number;
  @ApiProperty({
    type: 'string',
    description: 'Subject of the request!',
    example: 'This is summary exmaple text!',
  })
  @IsString()
  @IsOptional()
  subject: string;
  @ApiProperty({
    type: 'string',
    description: 'Message od the request!',
    example: 'Hi i wanna send this request to some one!',
  })
  @IsString()
  @IsOptional()
  message: string;
  @IsBoolean()
  active: boolean = true;
}
