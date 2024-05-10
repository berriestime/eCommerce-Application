import { useEffect, useState } from 'react';

import { Combobox, useCombobox } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { CustomTextInput } from '../custom-text-input';
import { COUNTRIES } from './constants';

// NOTE(berriestime):
// @see https://mantine.dev/form/get-input-props/#integrate-getinputprops-with-custom-inputs
interface CustomInputProps {
  defaultValue?: string;
  error?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
}

const CountrySelect = <T extends { shippingCountry: string }>({
  form,
}: {
  form: UseFormReturnType<T>;
}): JSX.Element => {
  const { defaultValue, error, onBlur, onChange, onFocus } = form.getInputProps('shippingCountry') as CustomInputProps;

  const countryCombobox = useCombobox({
    onDropdownClose: () => countryCombobox.resetSelectedOption(),
  });

  const [countryValue, setCountryValue] = useState(defaultValue ?? '');

  const shouldFilterOptions = !COUNTRIES.some((country) => country === countryValue);
  const filteredOptions = shouldFilterOptions
    ? COUNTRIES.filter((country) => country.toLowerCase().includes(countryValue.toLowerCase().trim()))
    : COUNTRIES;

  const countryOptions = filteredOptions.map((item) => (
    <Combobox.Option key={item} value={item}>
      {item}
    </Combobox.Option>
  ));

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    countryCombobox.selectFirstOption();
  }, [countryCombobox, countryValue]);

  return (
    <Combobox
      onOptionSubmit={(val) => {
        setCountryValue(val);
        countryCombobox.closeDropdown();

        // @ts-expect-error FIXME(berriestime): for some reason TypeScript fails to infer type
        form.setFieldValue('shippingCountry', val);
      }}
      store={countryCombobox}
    >
      <Combobox.Target>
        <CustomTextInput
          error={error}
          label="Country"
          onBlur={(event) => {
            countryCombobox.closeDropdown();
            onBlur?.(event);
          }}
          onChange={(event) => {
            setCountryValue(event.currentTarget.value);
            countryCombobox.openDropdown();
            countryCombobox.updateSelectedOptionIndex();
            onChange?.(event);
          }}
          onClick={() => countryCombobox.openDropdown()}
          onFocus={(event) => {
            countryCombobox.openDropdown();
            onFocus?.(event);
          }}
          placeholder="Pick value or type anything"
          value={countryValue}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{countryOptions}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export { CountrySelect };
