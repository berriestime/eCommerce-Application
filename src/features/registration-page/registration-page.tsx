import { FC, useEffect, useState } from 'react';

import { Anchor, Button, Checkbox, Container, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { UseFormReturnType, isEmail, useForm } from '@mantine/form';
import dayjs from 'dayjs';

import { validatePassword } from '@/utils/validate-password';
// import clsx from 'clsx';

import { Link } from 'react-router-dom';

import { useDisclosure } from '@mantine/hooks';
import { postcodeValidator } from 'postcode-validator';

import { COUNTRIES, CountrySelect } from '@/components/country-select';
import { CustomDateInput } from '@/components/custom-date-input';
import { CustomPasswordInput } from '@/components/custom-password-input';
import { CustomTextInput } from '@/components/custom-text-input';
import { Spoiler } from '@/components/spoiler';

import classes from './registration-page.module.css';

// NOTE(berriestime):
// @see https://mantine.dev/form/get-input-props/#integrate-getinputprops-with-custom-inputs
interface CheckboxProps {
  checked?: boolean;
  defaultValue?: string;
  error?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
}

const TEN_YEARS_AGO = dayjs(new Date()).subtract(10, 'year').toDate();
const TWENTY_YEARS_AGO = dayjs(new Date()).subtract(20, 'year').toDate();
const notEmpty = (value: string): null | string => (value.trim() ? null : 'Required');

const noSpecialOrDigits =
  (message: string) =>
  (value: string): null | string => {
    if (/\d/.test(value) || /[~`!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/.test(value)) {
      return message;
    }
    return null;
  };

const matchesPassword = (value: string, values: { password: string }): null | string =>
  value !== values.password ? 'Passwords did not match' : null;

const isProperCountry = (value: string): null | string => (COUNTRIES.includes(value) ? null : 'Invalid country');

const isProperPostcode =
  <K extends string, T extends Record<K, string>>(countryField: K) =>
  (value: string, values: UseFormReturnType<T>['values']): null | string => {
    const countryNamesToCodes: Record<string, string> = {
      Germany: 'DE',
      'United Kingdom': 'UK',
      'United States': 'US',
    };
    const code = countryNamesToCodes[values[countryField]];
    if (!code) {
      return 'Invalid country';
    }
    return postcodeValidator(value, code) ? null : 'Invalid postcode';
  };

const RegistrationPage: FC = () => {
  const form = useForm({
    initialValues: {
      billingCity: '',
      billingCountry: '',
      billingPostalCode: '',
      billingStreet: '',
      checkbox: false,
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      shippingCity: '',
      shippingCountry: '',
      shippingPostalCode: '',
      shippingStreet: '',
    },
    mode: 'uncontrolled',

    validate: {
      billingCity: noSpecialOrDigits('City must not contain special characters'),
      billingCountry: isProperCountry,
      billingPostalCode: isProperPostcode('billingCountry'),
      billingStreet: notEmpty,
      confirmPassword: matchesPassword,
      email: isEmail('Invalid email'),
      firstName: noSpecialOrDigits('No special characters'),
      lastName: noSpecialOrDigits('No special characters'),
      password: validatePassword,
      shippingCity: noSpecialOrDigits('City must not contain special characters'),
      shippingCountry: isProperCountry,
      shippingPostalCode: isProperPostcode('shippingCountry'),
      shippingStreet: notEmpty,
    },
    validateInputOnChange: true,
  });

  const [areBillingFieldsDisabled, { close: enableBillingFields, open: disableBillingFields }] = useDisclosure(false);
  const checkboxProps = form.getInputProps('checkbox', { type: 'checkbox' }) as CheckboxProps;
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    if (checked) {
      disableBillingFields();
      form.setFieldValue('billingCity', '');
      form.setFieldValue('billingCountry', '');
      form.setFieldValue('billingPostalCode', '');
      form.setFieldValue('billingStreet', '');
      form.setFieldError('billingCity', undefined);
      form.setFieldError('billingCountry', undefined);
      form.setFieldError('billingPostalCode', undefined);
      form.setFieldError('billingStreet', undefined);
    } else {
      enableBillingFields();
    }
  };

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
        <Spoiler header="Shipping address" initiallyOpen={true}>
          <Checkbox
            checked={checkboxProps.checked}
            defaultValue={checkboxProps.defaultValue}
            error={checkboxProps.error}
            key={form.key('checkbox')}
            label="The shipping and billing addresses are the same"
            mt="md"
            onBlur={checkboxProps.onBlur}
            onChange={(event) => {
              handleCheckbox(event);
              checkboxProps.onChange?.(event);
            }}
            onFocus={checkboxProps.onFocus}
            value={checkboxProps.value}
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
            <CountrySelect field="shippingCountry" form={form} required />
            <CustomTextInput
              key={form.key('shippingPostalCode')}
              label="PostalCode"
              placeholder="01234"
              required
              {...form.getInputProps('shippingPostalCode')}
            />
          </SimpleGrid>
        </Spoiler>
        <Spoiler forceFullyClosed={areBillingFieldsDisabled} header="Billing address">
          <SimpleGrid cols={2}>
            <CustomTextInput
              disabled={areBillingFieldsDisabled}
              key={form.key('billingStreet')}
              label="Street"
              placeholder="15329 Huston 21st"
              required={!areBillingFieldsDisabled}
              {...form.getInputProps('billingStreet')}
            />
            <CustomTextInput
              disabled={areBillingFieldsDisabled}
              key={form.key('billingCity')}
              label="City"
              placeholder="London"
              required={!areBillingFieldsDisabled}
              {...form.getInputProps('billingCity')}
            />
            <CountrySelect
              disabled={areBillingFieldsDisabled}
              field="billingCountry"
              form={form}
              required={!areBillingFieldsDisabled}
            />
            <CustomTextInput
              disabled={areBillingFieldsDisabled}
              key={form.key('billingPostalCode')}
              label="PostalCode"
              placeholder="01234"
              required={!areBillingFieldsDisabled}
              {...form.getInputProps('billingPostalCode')}
            />
          </SimpleGrid>
        </Spoiler>
        <Button fullWidth mt="xl" type="submit">
          Sign Up
        </Button>
      </form>
      <Text c="dimmed" mt={5} size="sm" ta="center">
        Already a member?{' '}
        <Anchor component={Link} size="sm" to="/login">
          Log in
        </Anchor>
      </Text>
    </Container>
  );
};

export { RegistrationPage };
