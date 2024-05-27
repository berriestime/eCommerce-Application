import { ReactElement } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { Container, Title } from '@mantine/core';

import { BaseButton } from '@/components/base-button';

import { ProfileDateOfBirth } from './birthday';
import { ProfileFirstName } from './first-name';
import { ProfileLastName } from './last-name';

const ProfileInfo = (user: Customer): ReactElement => {
  return (
    <Container>
      <Title order={2}>PERSONAL INFO</Title>
      <ProfileFirstName {...user} />
      <ProfileLastName {...user} />
      <ProfileDateOfBirth {...user} />
      <BaseButton>Change Password</BaseButton>
    </Container>
  );
};

export { ProfileInfo };
