import type { Customer } from '@commercetools/platform-sdk';

import type { ReactElement } from 'react';

import { Container, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BaseButton } from '@/components/base-button';

import { ProfileDateOfBirth } from './birthday';
import { ChangePasswordModal } from './change-password-modal/change-password-modal';
import { ProfileEmail } from './email';
import { ProfileFirstName } from './first-name';
import { ProfileLastName } from './last-name';

import classes from './profile-info.module.css';

const ProfileInfo = (user: Customer): ReactElement => {
  const [modalChangePasswordOpened, { close: closeChangePasswordModal, open: openChangePasswordModal }] =
    useDisclosure(false);

  return (
    <Container className={classes.infoWrapper}>
      <Title className={classes.title} order={2}>
        Personal Information
      </Title>
      <ProfileFirstName {...user} />
      <ProfileLastName {...user} />
      <ProfileDateOfBirth {...user} />
      <ProfileEmail {...user} />
      <BaseButton className={classes.passwordButton} onClick={openChangePasswordModal}>
        Change Password
      </BaseButton>
      <ChangePasswordModal close={closeChangePasswordModal} opened={modalChangePasswordOpened} user={user} />
    </Container>
  );
};

export { ProfileInfo };
