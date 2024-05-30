export const transformCountryIntoCountryCode = (country: string): string => {
  switch (country) {
    case 'Germany':
      return 'DE';
    case 'United Kingdom':
      return 'UK';
    case 'United States':
      return 'US';
    default:
      return '';
  }
};
