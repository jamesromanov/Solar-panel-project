import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class PagenationQuery {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;
}
