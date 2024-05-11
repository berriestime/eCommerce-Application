import { FC, useEffect, useState } from 'react';

import { Accordion, Anchor, Button, Checkbox, Container, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import dayjs from 'dayjs';

import { validatePassword } from '@/utils/validate-password';
// import clsx from 'clsx';

import { COUNTRIES, CountrySelect } from '@/components/country-select';
import { CustomDateInput } from '@/components/custom-date-input';
import { CustomPasswordInput } from '@/components/custom-password-input';
import { CustomTextInput } from '@/components/custom-text-input';

import classes from './registration-page.module.css';

const TEN_YEARS_AGO = dayjs(new Date()).subtract(10, 'year').toDate();
const TWENTY_YEARS_AGO = dayjs(new Date()).subtract(20, 'year').toDate();
const notEmpty = (value: string): null | string => (value.trim() ? null : 'Required');

const noSpecial =
  (message: string) =>
  (value: string): null | string => {
    if (/[^a-zA-Z]/.test(value)) {
      return message;
    }
    return null;
  };

const matchesPassword = (value: string, values: { password: string }): null | string =>
  value !== values.password ? 'Passwords did not match' : null;

const isProperCountry = (value: string): null | string => (COUNTRIES.includes(value) ? null : 'Invalid country');

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
      confirmPassword: matchesPassword,
      email: isEmail('Invalid email'),
      firstName: noSpecial('First name must not contain special characters'),
      lastName: noSpecial('Last name must not contain special characters'),
      password: validatePassword,
      shippingAddress: notEmpty,
      shippingCountry: isProperCountry,
    },
    validateInputOnChange: true,
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
    <Container className={classes.container} mx="auto" p={0} w={363}>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Title ta="center">Registration Page</Title>
        <CustomTextInput key={form.key('email')} label="Email" required {...form.getInputProps('email')} />
        <CustomPasswordInput key={form.key('password')} label="Password" required {...form.getInputProps('password')} />
        <CustomPasswordInput
          key={form.key('confirmPassword')}
          label="Confirm password"
          required
          {...form.getInputProps('confirmPassword')}
        />
        <Group gap={23} grow>
          <CustomTextInput
            key={form.key('firstName')}
            label="First Name"
            required
            {...form.getInputProps('firstName')}
          />
          <CustomTextInput key={form.key('lastName')} label="Last Name" required {...form.getInputProps('lastName')} />
        </Group>
        <CustomDateInput
          defaultDate={TWENTY_YEARS_AGO}
          defaultLevel="decade"
          key={form.key('birthday')}
          label="Birthday"
          maxDate={TEN_YEARS_AGO}
          required
          {...form.getInputProps('birthday')}
        />
        <Title component="h2">Shipping address</Title>
        <Checkbox
          key={form.key('checkbox')}
          label="The schipping and billing adresses are the same"
          mt="md"
          {...form.getInputProps('checkbox', { type: 'checkbox' })}
        />
        <CustomTextInput
          key={form.key('billingAddress')}
          label="Billing address"
          placeholder="15329 Huston 21st"
          required
          {...form.getInputProps('billingAddress')}
        />
        <SimpleGrid cols={2}>
          <CustomTextInput
            key={form.key('shippingStreet')}
            label="Street"
            placeholder="15329 Huston 21st"
            required
            {...form.getInputProps('shippingStreet')}
          />
          <CustomTextInput
            key={form.key('shippingCity')}
            label="City"
            placeholder="London"
            required
            {...form.getInputProps('shippingCity')}
          />
          <CustomTextInput
            key={form.key('shippingPostalCode')}
            label="PostalCode"
            placeholder="01234"
            required
            {...form.getInputProps('shippingPostalCode')}
          />
          <CountrySelect form={form} />
        </SimpleGrid>
        <Accordion></Accordion>
        <Button fullWidth mt="xl" type="submit">
          Sign Up
        </Button>
      </form>
      <Text c="dimmed" mt={5} size="sm" ta="center">
        Already a member?{' '}
        <Anchor component="button" size="sm">
          Log in
        </Anchor>
      </Text>
    </Container>
  );
};

export { RegistrationPage };
