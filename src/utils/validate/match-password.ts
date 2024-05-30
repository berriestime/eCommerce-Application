export const matchesPassword = (value: string, values: { password: string }): null | string => {
  if (!value) {
    return 'Required field';
  }
  return value !== values.password ? 'Passwords did not match' : null;
};
