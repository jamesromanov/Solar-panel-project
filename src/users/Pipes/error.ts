export const getSequelizeError = (err: any) => {
  if (err.errors && Array.isArray(err.errors) && err.errors.message) {
    return err.errors.map((e: any) => e.message).join(', ');
  }
  return err.message || 'Unexpected sequelize error';
};
