import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Anchor, Checkbox, Container, SimpleGrid, Text, Title } from '@mantine/core';
import { UseFormReturnType, isEmail, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { postcodeValidator } from 'postcode-validator';

import { BaseButton } from '@/components/base-button';
import { COUNTRIES, CountrySelect } from '@/components/country-select';
import { CustomDateInput } from '@/components/custom-date-input';
import { CustomPasswordInput } from '@/components/custom-password-input';
import { CustomTextInput } from '@/components/custom-text-input';
import { Spoiler } from '@/components/spoiler';
import { createCustomer } from '@/lib/commerstools/customer-creator';
import { addNotification } from '@/utils/show-notification';
import { validatePassword } from '@/utils/validate-password';

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

const transformCountryIntoCountryCode = (country: string): string => {
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

const isProperPostcode =
  <K extends string, T extends Record<K, string>>(countryField: K) =>
  (value: string, values: UseFormReturnType<T>['values']): null | string => {
    const code = transformCountryIntoCountryCode(values[countryField]);
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
      birthday: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      isDefaultBillingAddress: false,
      isDefaultShippingAddress: false,
      isSameAddress: false,
      lastName: '',
      password: '',
      shippingCity: '',
      shippingCountry: '',
      shippingPostalCode: '',
      shippingStreet: '',
    },
    mode: 'uncontrolled',

    onValuesChange: (values) => {
      if (values.isSameAddress) {
        form.setFieldValue('billingCity', values.shippingCity);
        form.setFieldValue('billingCountry', values.shippingCountry);
        form.setFieldValue('billingPostalCode', values.shippingPostalCode);
        form.setFieldValue('billingStreet', values.shippingStreet);
      }
    },
    transformValues: (values) => {
      return {
        ...values,
        billingCountry: transformCountryIntoCountryCode(values.billingCountry),
        birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
        shippingCountry: transformCountryIntoCountryCode(values.shippingCountry),
      };
    },
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
  const isSameAddressProps = form.getInputProps('isSameAddress', { type: 'checkbox' }) as CheckboxProps;
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

  const handleSubmit = (values: typeof form.values): void => {
    createCustomer({
      addresses: [
        {
          additionalStreetInfo: values.shippingStreet,
          city: values.shippingCity,
          country: values.shippingCountry,
          postalCode: values.shippingPostalCode,
        },
        {
          additionalStreetInfo: values.billingStreet,
          city: values.billingCity,
          country: values.billingCountry,
          postalCode: values.billingPostalCode,
        },
      ],
      billingAddresses: [1],
      dateOfBirth: values.birthday,
      defaultBillingAddress: values.isDefaultBillingAddress ? 1 : undefined,
      defaultShippingAddress: values.isDefaultShippingAddress ? 0 : undefined,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      shippingAddresses: [0],
    })
      .then(() => {
        addNotification({ message: 'You have successfully created an account.', title: 'Account created' });
      })
      .catch((error) => {
        addNotification({ message: `${error}`, title: 'Error', type: 'error' });
      });
  };

  return (
    <Container className={classes.container} mx="auto" p={16} size="xs">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title mb="lg" ta="center">
          Sign Up
        </Title>
        <CustomTextInput key={form.key('email')} label="Email" required {...form.getInputProps('email')} />
        <CustomPasswordInput key={form.key('password')} label="Password" required {...form.getInputProps('password')} />
        <CustomPasswordInput
          key={form.key('confirmPassword')}
          label="Confirm password"
          required
          {...form.getInputProps('confirmPassword')}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <CustomTextInput
            key={form.key('firstName')}
            label="First Name"
            required
            {...form.getInputProps('firstName')}
          />
          <CustomTextInput key={form.key('lastName')} label="Last Name" required {...form.getInputProps('lastName')} />
        </SimpleGrid>
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
            checked={isSameAddressProps.checked}
            defaultValue={isSameAddressProps.defaultValue}
            error={isSameAddressProps.error}
            key={form.key('isSameAddress')}
            label="The shipping and billing addresses are the same"
            mb="xs"
            mt="xs"
            onBlur={isSameAddressProps.onBlur}
            onChange={(event) => {
              handleCheckbox(event);
              isSameAddressProps.onChange?.(event);
            }}
            onFocus={isSameAddressProps.onFocus}
            value={isSameAddressProps.value}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
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
        <Checkbox
          key={form.key('isDefaultShippingAddress')}
          label="Set as default address"
          mb="lg"
          mt="xs"
          {...form.getInputProps('isDefaultShippingAddress')}
        />
        <Spoiler forceFullyClosed={areBillingFieldsDisabled} header="Billing address">
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
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
        <Checkbox
          key={form.key('isDefaultBillingAddress')}
          label="Set as default address"
          mt="xs"
          {...form.getInputProps('isDefaultBillingAddress')}
        />
        <BaseButton fullWidth mt="xl" type="submit">
          Sign Up
        </BaseButton>
      </form>
      <Text c="dimmed" className={classes.text} mt={30} size="sm" ta="center">
        Already a member?{' '}
        <Anchor className={classes.anchor} component="button" size="sm">
          <Link className={classes.authLink} to={'/login'}>
            Log in
          </Link>
        </Anchor>
      </Text>
    </Container>
  );
};

export { RegistrationPage };
