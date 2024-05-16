import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';

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

  return (
    <form
      onSubmit={form.onSubmit((customer) => {
        postCustomerLogin(customer)
          .then(
            function resolve() {
              changeAuthState();
              navigate('../');
            },
            function reject(err) {
              console.log(err);
              addNotification({
                message: 'Customer with this username and password was not found',
                title: 'Sign In Error',
                type: 'error',
              });
            },
          )
          .catch(console.error);
      })}
    >
      <TextInput key={form.key('email')} label="Email" required {...form.getInputProps('email')} />
      <PasswordInput label="Password" required {...form.getInputProps('password')} />
      <Button fullWidth mt="xl" type="submit">
        Sign in
      </Button>
    </form>
  );
};

export { LoginForm };
