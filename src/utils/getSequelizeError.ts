import {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
} from 'sequelize';

export function getSequelizeError(error: any): string {
  // if error is validation error or if the unique error for example email is unique
  if (
    error instanceof ValidationError ||
    error instanceof UniqueConstraintError
  ) {
    return error.errors.map((e) => e.message).join(', ') || 'Validation error!';
  }
  //   foreign key errors
  if (error instanceof ForeignKeyConstraintError) {
    return 'Invalid reference - a not found.';
  }
  // if database error occured
  if (error instanceof DatabaseError) {
    return 'A Database error occured.';
  }
  // NestJS or unknown structured errors (fallback)
  if (error?.message) {
    return typeof error.message === 'string'
      ? error.message
      : Array.isArray(error.message)
        ? error.message.join(', ')
        : JSON.stringify(error.message);
  }
  //   for other types of errors
  return 'An unexpected error occured!';
}
