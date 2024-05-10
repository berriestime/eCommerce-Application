const MESSAGE_EMAIL_REQUIRED = 'Email is required';
const MESSAGE_EMAIL_NO_TRAILING_WHITESPACE = 'Email address must not contain leading or trailing whitespace';
const MESSAGE_EMAIL_CONTAIN_AT_SYMBOL = "Email address must contain an '@' symbol";
const MESSAGE_EMAIL_MUST_FORMATTED = 'Email address must be properly formatted (e.g., user@example.com)';
const MESSAGE_EMAIL_NEED_DOMAIN = 'Email address must contain a domain name (e.g., example.com)';

const validateEmail = (value: string): null | string => {
  if (value.length === 0) {
    return MESSAGE_EMAIL_REQUIRED;
  }

  if (value[0] === ' ' || value.at(-1) === ' ') {
    return MESSAGE_EMAIL_NO_TRAILING_WHITESPACE;
  }

  if (!/(\w*[@]\w*)/.test(value)) {
    return MESSAGE_EMAIL_CONTAIN_AT_SYMBOL;
  }

  if (!/^\S+@\S+$/.test(value)) {
    return MESSAGE_EMAIL_MUST_FORMATTED;
  }

  if (!/(\w*@[a-zA-Z-0-9]+\.[a-zA-Z]\w*)/.test(value)) {
    return MESSAGE_EMAIL_NEED_DOMAIN;
  }

  return null;
};

export { validateEmail };
