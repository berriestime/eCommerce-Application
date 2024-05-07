import { FC } from 'react';

import { Anchor, Box, Button, Checkbox, Paper, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
// import clsx from 'clsx';

import { CustomPasswordInput } from '@/components/form/password-input';
import { CustomTextInput } from '@/components/form/text-input';

// import s from './registration-page.module.css';

const RegistrationPage: FC = () => {
  const form = useForm({
    initialValues: {
      checkbox: false,
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    mode: 'uncontrolled',

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Title ta="center">Registration Page</Title>
        <Paper mt={30} p={30} radius="md" shadow="md withBorder ">
          <CustomTextInput key={form.key('email')} label="Email" required={true} {...form.getInputProps('email')} />
          <CustomPasswordInput key={form.key('password')} label="Password" {...form.getInputProps('password')} />
          <CustomPasswordInput label="Confirm password" />
          <CustomTextInput label="First Name" required={true} />
          <CustomTextInput label="Last Name" required={true} />
          <Checkbox
            key={form.key('checkbox')}
            label="The schopping and billing adresses are the same"
            mt="md"
            {...form.getInputProps('checkbox', { type: 'checkbox' })}
          />
          <TextInput label="Shipping address" placeholder="15329 Huston 21st" required={true} />
          <TextInput label="Billing address" placeholder="15329 Huston 21st" required={true} />
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </Paper>
      </form>
      <Text c="dimmed" mt={5} size="sm" ta="center">
        Already a member?{' '}
        <Anchor component="button" size="sm">
          Log in
        </Anchor>
      </Text>
    </Box>
  );
};

export { RegistrationPage };
