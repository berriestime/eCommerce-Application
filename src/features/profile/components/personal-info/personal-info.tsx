import { ReactElement } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { Container, Title } from '@mantine/core';

import { BaseButton } from '@/components/base-button';

import { FirstName } from './first-name';

const PersonalInfo = (user: Customer): ReactElement => {
  return (
    <Container>
      <Title order={2}>PERSONAL INFO</Title>
      <FirstName {...user} />
      <BaseButton>Change Password</BaseButton>
    </Container>
  );
};

export { PersonalInfo };
