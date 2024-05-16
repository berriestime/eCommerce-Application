import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
      <CustomTextInput label="Email" required {...form.getInputProps('email')}></CustomTextInput>
      <CustomPasswordInput label="Password" required {...form.getInputProps('password')}></CustomPasswordInput>
      <BaseButton fullWidth mt={25} type="submit">
        Sign in
      </BaseButton>
    </form>
  );
};

export { LoginForm };
