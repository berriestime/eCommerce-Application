import { FC } from 'react';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';

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

  return (
    <form
      onSubmit={form.onSubmit((customer) => {
        postCustomerLogin(customer).catch((err) => console.log(err));
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
