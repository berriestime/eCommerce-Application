const validateEmail = (value: string): null | string => {
  if (value.length === 0) {
    return 'Email is required';
  }

  if (value[0] === ' ' || value[value.length - 1] === ' ') {
    return 'Email address must not contain leading or trailing whitespace';
  }

  if (!/(\w*[@]\w*)/.test(value)) {
    return "Email address must contain an '@' symbol";
  }

  if (!/^\S+@\S+$/.test(value)) {
    return 'Email address must be properly formatted (e.g., user@example.com)';
  }

  if (!/(\w*@[a-zA-Z-0-9].[a-zA-Z]\w*)/.test(value)) {
    return 'Email address must contain a domain name (e.g., example.com)';
  }

  return null;
};

export { validateEmail };
