import { ReactElement, useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { Container, Flex, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BaseButton } from '@/components/base-button';
import { AddressModal } from '@/features/profile/components/addresses/address-modal';

import { AddressCard } from './address-card/address-cars';

const ProfileAddresses = (user: Customer): ReactElement => {
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
  const [addresses, setAddresses] = useState(user.addresses);

  return (
    <>
      <Container>
        <Title order={2}>YOUR ADDRESSES</Title>
        <Flex direction={'column'} mt="md">
          {addresses.map((address) => (
            <AddressCard
              addresses={addresses}
              city={address.city}
              country={address.country}
              id={address.id}
              key={address.id}
              postalCode={address.postalCode}
              setAddresses={setAddresses}
              streetName={address.streetName}
            />
          ))}
        </Flex>
        <BaseButton onClick={openModal}>Add new address</BaseButton>
      </Container>
      <AddressModal addresses={addresses} close={closeModal} opened={modalOpened} setAddresses={setAddresses} />
    </>
  );
};

export { ProfileAddresses };
