import { FC, useEffect, useState } from 'react';

import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Combobox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useCombobox,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
// import clsx from 'clsx';

// import classes from './registration-page.module.css';

const validateEmail = (value: string): null | string => (/^\S+@\S+$/.test(value) ? null : 'Invalid email');
const notEmpty = (value: string): null | string => (value.trim() ? null : 'Required');
const checkPasswordStrength = (value: string): null | string => {
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(value)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(value)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[0-9]/.test(value)) {
    return 'Password must contain at least one digit';
  }
  return null;
};

const noSpecial =
  (message: string) =>
  (value: string): null | string => {
    if (/[^a-zA-Z]/.test(value)) {
      return message;
    }
    return null;
  };
const countries = ['UK', 'France', 'Germany'];

const RegistrationPage: FC = () => {
  const form = useForm({
    initialValues: {
      billingAddress: '',
      checkbox: false,
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      shippingAddress: '',
      shippingCity: '',
      shippingCountry: '',
      shippingPostalCode: '',
      shippingStreet: '',
    },
    mode: 'uncontrolled',

    validate: {
      billingAddress: notEmpty,
      confirmPassword: notEmpty,
      email: validateEmail,
      firstName: noSpecial('First name must not contain special characters'),
      lastName: noSpecial('Last name must not contain special characters'),
      password: checkPasswordStrength,
      shippingAddress: notEmpty,
    },
  });

  const countryCombobox = useCombobox({
    onDropdownClose: () => countryCombobox.resetSelectedOption(),
  });

  const [countryValue, setCountryValue] = useState('');

  const shouldFilterOptions = !countries.some((country) => country === countryValue);
  const filteredOptions = shouldFilterOptions
    ? countries.filter((country) => country.toLowerCase().includes(countryValue.toLowerCase().trim()))
    : countries;

  const countryOptions = filteredOptions.map((item) => (
    <Combobox.Option key={item} value={item}>
      {item}
    </Combobox.Option>
  ));

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    countryCombobox.selectFirstOption();
  }, [countryValue]);

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Title ta="center">Registration Page</Title>
        <Paper mt={30} p={30} radius="md" shadow="md withBorder ">
          <TextInput key={form.key('email')} label="Email" required {...form.getInputProps('email')} />
          <PasswordInput key={form.key('password')} label="Password" required {...form.getInputProps('password')} />
          <PasswordInput
            key={form.key('confirmPassword')}
            label="Confirm password"
            required
            {...form.getInputProps('confirmPassword')}
          />
          <TextInput key={form.key('firstName')} label="First Name" required {...form.getInputProps('firstName')} />
          <TextInput key={form.key('lastName')} label="Last Name" required {...form.getInputProps('lastName')} />
          <DateInput key={form.key('birthday')} label="Birthday" required {...form.getInputProps('birthday')} />
          <Checkbox
            key={form.key('checkbox')}
            label="The schipping and billing adresses are the same"
            mt="md"
            {...form.getInputProps('checkbox', { type: 'checkbox' })}
          />
          <TextInput
            key={form.key('shippingAddress')}
            label="Shipping address"
            placeholder="15329 Huston 21st"
            required
            {...form.getInputProps('shippingAddress')}
          />
          <TextInput
            key={form.key('billingAddress')}
            label="Billing address"
            placeholder="15329 Huston 21st"
            required
            {...form.getInputProps('billingAddress')}
          />
          <TextInput
            key={form.key('shippingStreet')}
            label="Street"
            placeholder="15329 Huston 21st"
            required
            {...form.getInputProps('shippingStreet')}
          />
          <TextInput
            key={form.key('shippingCity')}
            label="City"
            placeholder="London"
            required
            {...form.getInputProps('shippingCity')}
          />
          <TextInput
            key={form.key('shippingPostalCode')}
            label="PostalCode"
            placeholder="01234"
            required
            {...form.getInputProps('shippingPostalCode')}
          />
          <Combobox
            onOptionSubmit={(val) => {
              setCountryValue(val);
              countryCombobox.closeDropdown();
            }}
            store={countryCombobox}
          >
            <Combobox.Target>
              <TextInput
                label="Country"
                onBlur={() => countryCombobox.closeDropdown()}
                // onChange={(event) => {
                //   setCountryValue(event.currentTarget.value);
                //   countryCombobox.openDropdown();
                //   countryCombobox.updateSelectedOptionIndex();

                //   const { onChange } = form.getInputProps('shippingCountry');
                //   onChange(event);
                // }}
                onClick={() => countryCombobox.openDropdown()}
                onFocus={() => countryCombobox.openDropdown()}
                placeholder="Pick value or type anything"
                // value={countryValue}
                {...form.getInputProps('shippingCountry')}
              />
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>{countryOptions}</Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </Paper>
      </form>
      <Text c="dimmed" mt={5} size="sm" ta="center">
        Already a member?{' '}
        <Anchor component="button" size="sm">
          Log in
        </Anchor>
      </Text>
    </Box>
  );
};

export { RegistrationPage };
