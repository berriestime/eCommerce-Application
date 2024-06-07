export const onlyLetters =
  (message: string) =>
  (value: string): null | string => {
    if (!value) {
      return 'Required field';
    }
    if (!/^[A-Za-zäöüßÄÖÜА-Яа-я]+$/.test(value)) {
      return message;
    }
    return null;
  };
