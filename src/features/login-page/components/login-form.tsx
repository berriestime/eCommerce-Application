import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoadingOverlay } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';

import { BaseButton } from '@/components/base-button';
import { CustomPasswordInput } from '@/components/custom-password-input';
import { CustomTextInput } from '@/components/custom-text-input';
import { setAuthState } from '@/features/auth/authSlice';
import { type AuthState } from '@/types/authState';
import { addNotification } from '@/utils/show-notification';
import { validatePassword } from '@/utils/validate-password';

import { postCustomerLogin } from '../api';

const LoginForm: FC = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    mode: 'uncontrolled',

    validate: {
      email: isEmail('Invalid email'),
      password: (value) => validatePassword(value),
    },
    validateInputOnChange: true,
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const changeAuthState = (): { payload: AuthState; type: 'auth/setAuthState' } =>
    dispatch(setAuthState('AUTHENTICATED'));

  const [visible, setVisible] = useState(false);

  const toggle = (): void => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <LoadingOverlay loaderProps={{ type: 'oval' }} visible={visible} zIndex="2000" />
      <form
        onSubmit={form.onSubmit((customer) => {
          toggle();
          postCustomerLogin(customer)
            .then(() => {
              changeAuthState();
              navigate('/');
            })
            .catch((err) => {
              console.error('Login failed', err);
              addNotification({
                message: 'Customer with this username and password was not found',
                title: 'Sign In Error',
                type: 'error',
              });
            })
            .finally(() => {
              toggle();
            });
        })}
      >
        <CustomTextInput label="Email" required {...form.getInputProps('email')}></CustomTextInput>
        <CustomPasswordInput label="Password" required {...form.getInputProps('password')}></CustomPasswordInput>
        <BaseButton fullWidth mt={25} type="submit">
          Sign in
        </BaseButton>
      </form>
    </>
  );
};

export { LoginForm };
