"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeError = getSequelizeError;
const sequelize_1 = require("sequelize");
function getSequelizeError(error) {
    if (error instanceof sequelize_1.ValidationError ||
        error instanceof sequelize_1.UniqueConstraintError) {
        return error.errors.map((e) => e.message).join(', ') || 'Validation error!';
    }
    if (error instanceof sequelize_1.ForeignKeyConstraintError) {
        return 'Invalid reference - a not found.';
    }
    if (error instanceof sequelize_1.DatabaseError) {
        return 'A Database error occured.';
    }
    if (error?.message) {
        return typeof error.message === 'string'
            ? error.message
            : Array.isArray(error.message)
                ? error.message.join(', ')
                : JSON.stringify(error.message);
    }
    return 'An unexpected error occured!';
}
//# sourceMappingURL=getSequelizeError.js.map