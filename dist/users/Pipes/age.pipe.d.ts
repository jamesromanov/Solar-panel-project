import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class AgeValidaionPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
    private validateAge;
}
