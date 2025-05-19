import { CreateRequestDto } from './create-request.dto';
declare const UpdateRequestDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRequestDto>>;
export declare class UpdateRequestDto extends UpdateRequestDto_base {
    title: string;
    email: string;
    userId: number;
    subject: string;
    message: string;
    active: boolean;
}
export {};
