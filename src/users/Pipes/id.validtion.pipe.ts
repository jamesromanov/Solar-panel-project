import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<string | number> {
  transform(value: string | number, metadata: ArgumentMetadata): number {
    const id = Number(value);
    if (isNaN(id) || id <= 0) throw new BadRequestException('Invalid id!');
    return id;
  }
}
