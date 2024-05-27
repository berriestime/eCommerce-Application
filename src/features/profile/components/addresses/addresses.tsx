import { ReactElement } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { Container, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BaseButton } from '@/components/base-button';
import { AddressModal } from '@/features/profile/components/addresses/address-modal';

// import { postUserAddress } from '../../api/address-api';

const ProfileAddresses = (user: Customer): ReactElement => {
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);

  //TODO add cards for addresses and delete console.log
  console.log(user.addresses);

  return (
    <>
      <Container>
        <Title order={2}>YOUR ADDRESSES</Title>
        <BaseButton onClick={openModal}>Add new address</BaseButton>
      </Container>
      <AddressModal close={closeModal} opened={modalOpened} />
    </>
  );
};

export { ProfileAddresses };
