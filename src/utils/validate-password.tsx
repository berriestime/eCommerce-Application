const MIN_PASSWORD_LENGTH = 8;

const MESSAGE_PASSWORD_REQUIRED = 'Password is required';
const MESSAGE_PASSWORD_NO_TRAILING_WHITESPACE = 'Must not contain leading or trailing whitespace';
const MESSAGE_PASSWORD_LENGTH_ERROR = 'Must be at least 8 characters long';
const MESSAGE_PASSWORD_CONTAIN_UPPERCASE = 'Must contain at least one uppercase letter';
const MESSAGE_PASSWORD_CONTAIN_LOWERCASE = 'Must contain at least one lowercase letter';
const MESSAGE_PASSWORD_CONTAIN_DIGIT = 'Must contain at least one digit';
const MESSAGE_PASSWORD_CONTAIN_SPECIAL_CHARACTER = 'Must contain at least one special character (@#$%^&*)';

const validatePassword = (value: string): null | string => {
  if (value.length === 0) {
    return MESSAGE_PASSWORD_REQUIRED;
  }

  if (value[0] === ' ' || value.at(-1) === ' ') {
    return MESSAGE_PASSWORD_NO_TRAILING_WHITESPACE;
  }

  if (!(value.length >= MIN_PASSWORD_LENGTH)) {
    return MESSAGE_PASSWORD_LENGTH_ERROR;
  }

  if (!/(\w*[A-Z]\w*)/.test(value)) {
    return MESSAGE_PASSWORD_CONTAIN_UPPERCASE;
  }

  if (!/(\w*[a-z]\w*)/.test(value)) {
    return MESSAGE_PASSWORD_CONTAIN_LOWERCASE;
  }

  if (!/(\w*[0-9]\w*)/.test(value)) {
    return MESSAGE_PASSWORD_CONTAIN_DIGIT;
  }

  if (!/(\w*[!@#$%^&*]\w*)/.test(value)) {
    return MESSAGE_PASSWORD_CONTAIN_SPECIAL_CHARACTER;
  }

  return null;
};

export { validatePassword };
