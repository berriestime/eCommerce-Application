import { ReactElement } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { Container, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BaseButton } from '@/components/base-button';

import { ProfileDateOfBirth } from './birthday';
import { ChangePasswordModal } from './change-password-modal/change-password-modal';
import { ProfileEmail } from './email';
import { ProfileFirstName } from './first-name';
import { ProfileLastName } from './last-name';

const ProfileInfo = (user: Customer): ReactElement => {
  const [modalChangePasswordOpened, { close: closeChangePasswordModal, open: openChangePasswordModal }] =
    useDisclosure(false);

  return (
    <Container>
      <Title order={2}>PERSONAL INFO</Title>
      <ProfileFirstName {...user} />
      <ProfileLastName {...user} />
      <ProfileDateOfBirth {...user} />
      <ProfileEmail {...user} />
      <BaseButton onClick={openChangePasswordModal}>Change Password</BaseButton>
      <ChangePasswordModal close={closeChangePasswordModal} opened={modalChangePasswordOpened} user={user} />
    </Container>
  );
};

export { ProfileInfo };
