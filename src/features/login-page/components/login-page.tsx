import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Anchor, Container, Paper, Text, Title } from '@mantine/core';

import { LoginForm } from './login-form';

import classes from './login-page.module.css';

const LoginPage: FC = () => {
  return (
    <Container className={classes.container} my={40} size={420}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" mt={5} size="sm" ta="center">
        Do not have an account yet?{' '}
        <Anchor component="button" size="sm">
          <NavLink to={'/registration'}>Create account</NavLink>
        </Anchor>
      </Text>

      <Paper mt={30} p={30} radius="md" shadow="md withBorder ">
        <LoginForm />
      </Paper>
    </Container>
  );
};

export { LoginPage };
