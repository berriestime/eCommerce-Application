export const notEmpty = (value: string): null | string => (value.trim() ? null : 'Required field');
