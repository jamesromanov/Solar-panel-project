import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
@Injectable()
export class AgeValidaionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'object' && !this.validateAge(value))
      throw new BadRequestException('Invalid age value!');
    else return value;
  }
  private validateAge(val: any): boolean {
    if (!val) return false;
    const age = Number(val.age);
    return !isNaN(age) && age > 15 && age < 90;
  }
}
