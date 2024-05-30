import { COUNTRIES } from '@/constants/countries';

export const isProperCountry = (value: string): null | string => (COUNTRIES.includes(value) ? null : 'Invalid country');
