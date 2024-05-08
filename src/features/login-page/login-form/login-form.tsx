import { FC } from 'react';

import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { validateEmail } from '../../../components/form/validate-email';
import { validatePassword } from '../../../components/form/validate-password';

const LoginForm: FC = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    mode: 'uncontrolled',

    validate: {
      email: (value) => validateEmail(value),
      password: (value) => validatePassword(value),
    },
    validateInputOnChange: true,
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput key={form.key('email')} label="Email" required {...form.getInputProps('email')} />
      <PasswordInput label="Password" required {...form.getInputProps('password')} />
      <Button fullWidth mt="xl" type="submit">
        Sign in
      </Button>
    </form>
  );
};

export { LoginForm };
