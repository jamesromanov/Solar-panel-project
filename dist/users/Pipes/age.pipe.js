"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgeValidaionPipe = void 0;
const common_1 = require("@nestjs/common");
let AgeValidaionPipe = class AgeValidaionPipe {
    transform(value, metadata) {
        if (typeof value !== 'object' && !this.validateAge(value))
            throw new common_1.BadRequestException('Invalid age value!');
        else
            return value;
    }
    validateAge(val) {
        if (!val)
            return false;
        const age = Number(val.age);
        return !isNaN(age) && age > 15 && age < 90;
    }
};
exports.AgeValidaionPipe = AgeValidaionPipe;
exports.AgeValidaionPipe = AgeValidaionPipe = __decorate([
    (0, common_1.Injectable)()
], AgeValidaionPipe);
//# sourceMappingURL=age.pipe.js.map