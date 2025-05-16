"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeError = void 0;
const getSequelizeError = (err) => {
    if (err.errors && Array.isArray(err.errors) && err.errors.message) {
        return err.errors.map((e) => e.message).join(', ');
    }
    return err.message || 'Unexpected sequelize error';
};
exports.getSequelizeError = getSequelizeError;
//# sourceMappingURL=error.js.map