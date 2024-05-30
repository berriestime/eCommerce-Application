export const isEmail =
  (message: string) =>
  (value: string): null | string => {
    if (!value) {
      return 'Required field';
    }

    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : message;
  };
