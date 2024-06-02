import type { UseFormReturnType } from '@mantine/form';

import { postcodeValidator } from 'postcode-validator';

import { transformCountryIntoCountryCode } from './transform-country';

export const isProperPostcode =
  <K extends string, T extends Record<K, string>>(countryField: K) =>
  (value: string, values: UseFormReturnType<T>['values']): null | string => {
    const code = transformCountryIntoCountryCode(values[countryField]);
    if (!code) {
      return 'Invalid country';
    }
    return postcodeValidator(value, code) ? null : 'Invalid postcode';
  };
