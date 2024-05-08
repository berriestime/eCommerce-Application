const MIN_PASSWORD_LENGTH = 8;

const validatePassword = (value: string): null | string => {
  if (value.length === 0) {
    return 'Password is required';
  }

  if (value[0] === ' ' || value.at(-1) === ' ') {
    return 'Password must not contain leading or trailing whitespace';
  }

  if (!(value.length >= MIN_PASSWORD_LENGTH)) {
    return 'Password must be at least 8 characters long';
  }

  if (!/(\w*[A-Z]\w*)/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }

  if (!/(\w*[a-z]\w*)/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }

  if (!/(\w*[0-9]\w*)/.test(value)) {
    return 'Password must contain at least one digit';
  }

  if (!/(\w*[!@#$%^&*]\w*)/.test(value)) {
    return 'Password must contain at least one special character (@#$%^&*)';
  }

  return null;
};

export { validatePassword };
