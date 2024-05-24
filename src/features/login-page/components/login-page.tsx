import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Anchor, Container, Paper, Text, Title } from '@mantine/core';

import { LoginForm } from './login-form';

import classes from './login-page.module.css';

const LoginPage: FC = () => {
  return (
    <Container className={classes.container} size={420}>
      <Title className={classes.title} ta="center">
        Welcome Back
      </Title>
      <Text className={classes.text} mb={5} mt={30} px={14} ta="center">
        Do not have an account yet?{' '}
        <Anchor className={classes.anchor} component="button" ml={5}>
          <Link className={classes.authLink} to={'/registration'}>
            Create account
          </Link>
        </Anchor>
      </Text>

      <Paper mt={30} p={14} radius="md" shadow="md withBorder ">
        <LoginForm />
      </Paper>
    </Container>
  );
};

export { LoginPage };
