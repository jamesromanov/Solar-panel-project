import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class idValidator {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  id: number;
}
