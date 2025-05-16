import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform<string | number> {
    transform(value: string | number, metadata: ArgumentMetadata): number;
}
