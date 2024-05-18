import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Address } from '@commercetools/platform-sdk';
import { Anchor, Checkbox, Container, SimpleGrid, Text, Title } from '@mantine/core';
import { UseFormReturnType, isEmail, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { postcodeValidator } from 'postcode-validator';

import { BaseButton } from '@/components/base-button';
import { CustomDateInput } from '@/components/custom-date-input';
import { CustomPasswordInput } from '@/components/custom-password-input';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { createCustomer } from '@/lib/commerstools/customer-creator';
import { AuthState } from '@/types/authState';
import { addNotification } from '@/utils/show-notification';
import { validatePassword } from '@/utils/validate-password';

import { setAuthState } from '../auth/authSlice';

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

const COUNTRIES = ['United Kingdom', 'Germany', 'United States'];
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

const wrapSameAddressCheck =
  <T extends { isSameAddress: boolean }>(cb: (value: string, values: T) => null | string) =>
  (value: string, values: T) => {
    if (values.isSameAddress) {
      return null;
    }
    return cb(value, values);
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
    mode: 'controlled',

    onValuesChange: (values, previous) => {
      if (values.isSameAddress) {
        form.setFieldValue('billingCity', values.shippingCity);
        form.setFieldValue('billingCountry', values.shippingCountry);
        form.setFieldValue('billingPostalCode', values.shippingPostalCode);
        form.setFieldValue('billingStreet', values.shippingStreet);
      }
      if (previous.shippingCountry !== values.shippingCountry && form.isDirty('shippingPostalCode')) {
        const { hasError } = form.validateField('shippingPostalCode');
        if (!hasError) {
          form.setFieldError('shippingPostalCode', '');
        }
      }
      if (previous.billingCountry !== values.billingCountry && form.isDirty('billingPostalCode')) {
        const { hasError } = form.validateField('billingPostalCode');
        if (!hasError) {
          form.setFieldError('billingPostalCode', '');
        }
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
      billingCity: wrapSameAddressCheck(noSpecialOrDigits('City must not contain special characters')),
      billingCountry: wrapSameAddressCheck(isProperCountry),
      billingPostalCode: wrapSameAddressCheck(isProperPostcode('billingCountry')),
      billingStreet: wrapSameAddressCheck(notEmpty),
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
    } else {
      enableBillingFields();
    }
  };

  const handleSubmit = (values: typeof form.values): void => {
    const getAddresses = (values: typeof form.values): Address[] => {
      const addresses = [
        {
          additionalStreetInfo: values.shippingStreet,
          city: values.shippingCity,
          country: values.shippingCountry,
          postalCode: values.shippingPostalCode,
        },
      ];
      if (!values.isSameAddress) {
        addresses.push({
          additionalStreetInfo: values.billingStreet,
          city: values.billingCity,
          country: values.billingCountry,
          postalCode: values.billingPostalCode,
        });
      }
      return addresses;
    };
    const addresses = getAddresses(values);

    const shippingAddressesId = 0;
    const billingAddressesId = values.isSameAddress ? 0 : 1;

    const defaultBillingAddress = values.isDefaultBillingAddress ? billingAddressesId : undefined;
    const defaultShippingAddress = values.isDefaultShippingAddress ? shippingAddressesId : undefined;

    createCustomer({
      addresses,
      billingAddresses: [billingAddressesId],
      dateOfBirth: values.birthday,
      defaultBillingAddress,
      defaultShippingAddress,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      shippingAddresses: [shippingAddressesId],
    })
      .then(() => {
        addNotification({ message: 'You have successfully created an account.', title: 'Account created' });
      })
      .then(() => {
        changeAuthState();
        navigate('../');
      })
      .catch((error) => {
        addNotification({ message: `${error}`, title: 'Error', type: 'error' });
      });
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const changeAuthState = (): { payload: AuthState; type: 'auth/setAuthState' } =>
    dispatch(setAuthState('AUTHENTICATED'));

  return (
    <Container className={classes.container} mx="auto" p={16} size="xs">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title className={classes.title} mb={30} mt={5} ta="center">
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
          mb={30}
          required
          {...form.getInputProps('birthday')}
        />
        <Text className={classes.textAddress} mb={20}>
          Shipping address
        </Text>
        <Checkbox
          checked={isSameAddressProps.checked}
          className={classes.text}
          color="rgba(243, 231, 228, 1)"
          defaultValue={isSameAddressProps.defaultValue}
          error={isSameAddressProps.error}
          key={form.key('isSameAddress')}
          label="The shipping and billing addresses are the same"
          my={'sm'}
          onBlur={isSameAddressProps.onBlur}
          onChange={(event) => {
            handleCheckbox(event);
            isSameAddressProps.onChange?.(event);
          }}
          onFocus={isSameAddressProps.onFocus}
          value={isSameAddressProps.value}
          variant="outline"
        />
        <Checkbox
          className={classes.text}
          color="rgba(243, 231, 228, 1)"
          key={form.key('isDefaultShippingAddress')}
          label="Set as default address"
          my={'sm'}
          variant="outline"
          {...form.getInputProps('isDefaultShippingAddress')}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <CustomTextInput
            key={form.key('shippingStreet')}
            label="Street"
            mt={10}
            required
            {...form.getInputProps('shippingStreet')}
          />
          <CustomTextInput
            key={form.key('shippingCity')}
            label="City"
            mt={10}
            required
            {...form.getInputProps('shippingCity')}
          />
          <CustomSelect label="Country" required {...form.getInputProps('shippingCountry')} data={COUNTRIES} />
          <CustomTextInput
            key={form.key('shippingPostalCode')}
            label="PostalCode"
            required
            {...form.getInputProps('shippingPostalCode')}
          />
        </SimpleGrid>
        <Text className={classes.textAddress} mb={20} mt={30}>
          Billing address
        </Text>
        <Checkbox
          className={classes.text}
          color="rgba(243, 231, 228, 1)"
          key={form.key('isDefaultBillingAddress')}
          label="Set as default address"
          my={'sm'}
          variant="outline"
          {...form.getInputProps('isDefaultBillingAddress')}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <CustomTextInput
            disabled={areBillingFieldsDisabled}
            key={form.key('billingStreet')}
            label="Street"
            mt={10}
            required={!areBillingFieldsDisabled}
            {...form.getInputProps('billingStreet')}
          />
          <CustomTextInput
            disabled={areBillingFieldsDisabled}
            key={form.key('billingCity')}
            label="City"
            mt={10}
            required={!areBillingFieldsDisabled}
            {...form.getInputProps('billingCity')}
          />
          <CustomSelect
            disabled={areBillingFieldsDisabled}
            label="Country"
            required={!areBillingFieldsDisabled}
            {...form.getInputProps('billingCountry')}
            data={COUNTRIES}
            searchable
          />
          <CustomTextInput
            disabled={areBillingFieldsDisabled}
            key={form.key('billingPostalCode')}
            label="PostalCode"
            required={!areBillingFieldsDisabled}
            {...form.getInputProps('billingPostalCode')}
          />
        </SimpleGrid>
        <BaseButton fullWidth mb={30} mt={30} type="submit">
          Sign Up
        </BaseButton>
      </form>
      <Text className={classes.text} mb={15} px={14} ta="center">
        Already a member?{' '}
        <Anchor className={classes.anchor} component="button" ml={5}>
          <Link className={classes.authLink} to={'/login'}>
            Log in
          </Link>
        </Anchor>
      </Text>
    </Container>
  );
};

export { RegistrationPage };
