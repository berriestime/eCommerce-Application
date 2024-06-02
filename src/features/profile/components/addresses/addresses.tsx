import type { Customer } from '@commercetools/platform-sdk';

import type { ReactElement } from 'react';
import { useState } from 'react';

import { Container, Flex, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

import { BaseButton } from '@/components/base-button';
import { AddAddressModal } from '@/features/profile/components/addresses/add-address-modal';
import { isProperCountry } from '@/utils/validate/is-proper-country';
import { isProperPostcode } from '@/utils/validate/is-proper-postcode';
import { notEmpty } from '@/utils/validate/not-empty';
import { onlyLetters } from '@/utils/validate/only-letters';
import { transformCountryIntoCountryCode } from '@/utils/validate/transform-country';

import type { EditAddress } from '../../types/edit-address';

import { AddressCard } from './address-card/address-card';
import { EditAddressModal } from './address-edit-modal/edit-address-modal';

import classes from './addresses.module.css';

const ProfileAddresses = (user: Customer): ReactElement => {
  const [modalAddAddressOpened, { close: closeAddAddressModal, open: openAddAddressModal }] = useDisclosure(false);
  const [modalEditAddressOpened, { close: closeEditAddressModal, open: openEditAddressModal }] = useDisclosure(false);
  const [addresses, setAddresses] = useState(user.addresses);

  const initialAddress = {
    city: '',
    country: '',
    defaultBillingAddress: '',
    defaultShippingAddress: '',
    id: '',
    postalCode: '',
    streetName: '',
  } as unknown as EditAddress;
  const [editAddress, setEditAddress] = useState(initialAddress);

  const [defaultBillingAddress, setDefaultBillingAddress] = useState(
    user.defaultBillingAddressId ? user.defaultBillingAddressId : null,
  );
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(
    user.defaultShippingAddressId ? user.defaultShippingAddressId : null,
  );

  const form = useForm({
    initialValues: {
      city: editAddress.city ? editAddress.city : '',
      country: editAddress.country,
      defaultBillingAddress: editAddress.defaultBillingAddress,
      defaultShippingAddress: editAddress.defaultShippingAddress,
      id: editAddress.id,
      postalCode: editAddress.postalCode ? editAddress.postalCode : '',
      streetName: editAddress.streetName ? editAddress.streetName : '',
    },
    mode: 'uncontrolled',
    transformValues: (values) => {
      return {
        ...values,
        country: transformCountryIntoCountryCode(values.country),
      };
    },
    validate: {
      city: onlyLetters('Only letters'),
      country: isProperCountry,
      postalCode: isProperPostcode('country'),
      streetName: notEmpty,
    },
    validateInputOnChange: true,
  });

  return (
    <>
      <Container className={classes.addressWrapper}>
        <Title className={classes.title} order={2}>
          Addresses
        </Title>
        <Flex direction={'column'} mt="md">
          {addresses.map((address) => (
            <AddressCard
              addresses={addresses}
              city={address.city}
              country={address.country}
              defaultBilling={defaultBillingAddress}
              defaultShipping={defaultShippingAddress}
              editAddress={editAddress}
              id={address.id}
              key={address.id}
              openEditModal={openEditAddressModal}
              postalCode={address.postalCode}
              setAddresses={setAddresses}
              setEditAddress={setEditAddress}
              setValues={form.setValues}
              streetName={address.streetName}
            />
          ))}
        </Flex>
        <BaseButton className={classes.addButton} onClick={openAddAddressModal}>
          Add new address
        </BaseButton>
      </Container>
      <AddAddressModal
        addresses={addresses}
        close={closeAddAddressModal}
        opened={modalAddAddressOpened}
        setAddresses={setAddresses}
        setBilling={setDefaultBillingAddress}
        setShipping={setDefaultShippingAddress}
      />
      <EditAddressModal
        addresses={addresses}
        close={closeEditAddressModal}
        editAddress={editAddress}
        form={form}
        opened={modalEditAddressOpened}
        setAddresses={setAddresses}
        setBilling={setDefaultBillingAddress}
        setShipping={setDefaultShippingAddress}
      />
    </>
  );
};

export { ProfileAddresses };
