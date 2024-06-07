import type { Address } from '@commercetools/platform-sdk';

import type { FC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Anchor, Checkbox, Container, LoadingOverlay, SimpleGrid, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';

import type { AuthState } from '@/types/authState';

import { BaseButton } from '@/components/base-button';
import { CustomDateInput } from '@/components/custom-date-input';
import { CustomPasswordInput } from '@/components/custom-password-input';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { COUNTRIES } from '@/constants/countries';
import { createCustomer } from '@/lib/commerstools/customer-creator';
import { validatePassword } from '@/utils';
import { addNotification } from '@/utils/show-notification';
import { isProperCountry } from '@/utils/validate/is-proper-country';
import { isProperPostcode } from '@/utils/validate/is-proper-postcode';
import { isEmail } from '@/utils/validate/isEmail';
import { matchesPassword } from '@/utils/validate/match-password';
import { notEmpty } from '@/utils/validate/not-empty';
import { onlyLetters } from '@/utils/validate/only-letters';
import { transformCountryIntoCountryCode } from '@/utils/validate/transform-country';

import { setAuthState } from '../auth/authSlice';
import { postCustomerLogin } from '../login-page/api';

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

const TODAY = new Date();
const ONE_HUNDRED_AND_THIRTY_YEARS_AGO = dayjs(new Date()).subtract(130, 'year').toDate();

const wrapSameAddressCheck =
  <T extends { isSameAddress: boolean }>(cb: (value: string, values: T) => null | string) =>
  (value: string, values: T) => {
    if (values.isSameAddress) {
      return null;
    }
    return cb(value, values);
  };

const RegistrationPage: FC = () => {
  const [visible, setVisible] = useState(false);

  const toggle = (): void => {
    setVisible((prev) => !prev);
  };

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
      billingCity: wrapSameAddressCheck(onlyLetters('Only letters')),
      billingCountry: wrapSameAddressCheck(isProperCountry),
      billingPostalCode: wrapSameAddressCheck(isProperPostcode('billingCountry')),
      billingStreet: wrapSameAddressCheck(notEmpty),
      birthday: (value) => {
        if (!value) {
          return 'Required field';
        }
        return dayjs(value).isAfter(dayjs().subtract(18, 'years')) ? 'Must be at least 18 years old' : null;
      },
      confirmPassword: matchesPassword,
      email: isEmail('Invalid email'),
      firstName: onlyLetters('Only letters'),
      lastName: onlyLetters('Only letters'),
      password: validatePassword,
      shippingCity: onlyLetters('Only letters'),
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
      form.clearFieldError('billingCity');
      form.clearFieldError('billingCountry');
      form.clearFieldError('billingPostalCode');
      form.clearFieldError('billingStreet');
      disableBillingFields();
    } else {
      const billingFields = ['billingCity', 'billingCountry', 'billingPostalCode', 'billingStreet'];
      setTimeout(() => {
        billingFields.forEach((field) => form.isTouched(field));
        form.validateField('billingCity');
        form.validateField('billingCountry');
        form.validateField('billingPostalCode');
        form.validateField('billingStreet');
      }, 0);

      enableBillingFields();
    }
  };

  const handleSubmit = (values: typeof form.values): void => {
    const getAddresses = (values: typeof form.values): Address[] => {
      const addresses = [
        {
          city: values.shippingCity,
          country: values.shippingCountry,
          postalCode: values.shippingPostalCode,
          streetName: values.shippingStreet,
        },
      ];
      if (!values.isSameAddress) {
        addresses.push({
          city: values.billingCity,
          country: values.billingCountry,
          postalCode: values.billingPostalCode,
          streetName: values.billingStreet,
        });
      }
      return addresses;
    };
    const addresses = getAddresses(values);

    const shippingAddressesId = 0;
    const billingAddressesId = values.isSameAddress ? 0 : 1;

    const defaultBillingAddress = values.isDefaultBillingAddress ? billingAddressesId : undefined;
    const defaultShippingAddress = values.isDefaultShippingAddress ? shippingAddressesId : undefined;

    toggle();
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
        return postCustomerLogin({ email: values.email, password: values.password });
      })
      .then(() => {
        changeAuthState();
        navigate('../');
      })
      .catch((error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        addNotification({ message: errorMessage, title: 'Error', type: 'error' });
      })
      .finally(() => {
        toggle();
      });
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const changeAuthState = (): { payload: AuthState; type: 'auth/setAuthState' } =>
    dispatch(setAuthState('AUTHENTICATED'));

  return (
    <>
      <LoadingOverlay loaderProps={{ type: 'oval' }} pos="fixed" visible={visible} zIndex="2000" />
      <Container className={classes.container} mx="auto" p={16} size="xs">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title className={classes.title} mb={50} mt={80} ta="center">
            Sign Up
          </Title>
          <CustomTextInput key={form.key('email')} label="Email" withAsterisk {...form.getInputProps('email')} />
          <CustomPasswordInput
            key={form.key('password')}
            label="Password"
            withAsterisk
            {...form.getInputProps('password')}
          />
          <CustomPasswordInput
            key={form.key('confirmPassword')}
            label="Confirm password"
            withAsterisk
            {...form.getInputProps('confirmPassword')}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <CustomTextInput
              key={form.key('firstName')}
              label="First Name"
              withAsterisk
              {...form.getInputProps('firstName')}
            />
            <CustomTextInput
              key={form.key('lastName')}
              label="Last Name"
              withAsterisk
              {...form.getInputProps('lastName')}
            />
          </SimpleGrid>
          <CustomDateInput
            defaultLevel="decade"
            key={form.key('birthday')}
            label="Birthday"
            maxDate={TODAY}
            mb={30}
            minDate={ONE_HUNDRED_AND_THIRTY_YEARS_AGO}
            withAsterisk
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
            mt={20}
            my={'sm'}
            variant="outline"
            {...form.getInputProps('isDefaultShippingAddress')}
          />
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <CustomTextInput
              key={form.key('shippingStreet')}
              label="Street"
              mt={10}
              withAsterisk
              {...form.getInputProps('shippingStreet')}
            />
            <CustomTextInput
              key={form.key('shippingCity')}
              label="City"
              mt={10}
              withAsterisk
              {...form.getInputProps('shippingCity')}
            />
            <CustomSelect label="Country" withAsterisk {...form.getInputProps('shippingCountry')} data={COUNTRIES} />
            <CustomTextInput
              key={form.key('shippingPostalCode')}
              label="PostalCode"
              withAsterisk
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
              withAsterisk
              {...form.getInputProps('billingStreet')}
            />
            <CustomTextInput
              disabled={areBillingFieldsDisabled}
              key={form.key('billingCity')}
              label="City"
              mt={10}
              withAsterisk
              {...form.getInputProps('billingCity')}
            />
            <CustomSelect
              disabled={areBillingFieldsDisabled}
              label="Country"
              withAsterisk
              {...form.getInputProps('billingCountry')}
              data={COUNTRIES}
            />
            <CustomTextInput
              disabled={areBillingFieldsDisabled}
              key={form.key('billingPostalCode')}
              label="PostalCode"
              withAsterisk
              {...form.getInputProps('billingPostalCode')}
            />
          </SimpleGrid>
          <BaseButton c="bright" fullWidth mb={40} mt={30} type="submit">
            Sign Up
          </BaseButton>
        </form>
        <Text className={classes.text} mb={80} px={14} ta="center">
          Already a member?{' '}
          <Anchor className={classes.anchor} component="button" ml={5}>
            <Link className={classes.authLink} to={'/login'}>
              Log in
            </Link>
          </Anchor>
        </Text>
      </Container>
    </>
  );
};

export { RegistrationPage };
