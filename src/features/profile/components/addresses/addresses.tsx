import { ReactElement, useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { Container, Flex, Title } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { postcodeValidator } from 'postcode-validator';

import { BaseButton } from '@/components/base-button';
import { AddAddressModal } from '@/features/profile/components/addresses/add-address-modal';

import { AddressCard, EditAddress } from './address-card/address-cars';
import { EditAddressModal } from './address-edit-modal/edit-address-modal';

const COUNTRIES = ['United Kingdom', 'Germany', 'United States'];
const notEmpty = (value: string): null | string => (value.trim() ? null : 'Required field');

const onlyLetters =
  (message: string) =>
  (value: string): null | string => {
    if (!value) {
      return 'Required field';
    }
    if (!/^[A-Za-zäöüßÄÖÜА-Яа-я]+$/.test(value)) {
      return message;
    }
    return null;
  };

const isProperCountry = (value: string): null | string => (COUNTRIES.includes(value) ? null : 'Invalid country');

const transformCountryIntoCountryCode = (country: string): string => {
  switch (country) {
    case 'Germany':
      return 'DE';
    case 'United Kingdom':
      return 'UK';
    case 'United States':
      return 'US';
    default:
      return '';
  }
};

const isProperPostcode =
  <K extends string, T extends Record<K, string>>(countryField: K) =>
  (value: string, values: UseFormReturnType<T>['values']): null | string => {
    const code = transformCountryIntoCountryCode(values[countryField]);
    if (!code) {
      return 'Invalid country';
    }
    return postcodeValidator(value, code) ? null : 'Invalid postcode';
  };

const ProfileAddresses = (user: Customer): ReactElement => {
  const [modalAddAddressOpened, { close: closeAddAddressModal, open: openAddAddressModal }] = useDisclosure(false);
  const [modalEditAddressOpened, { close: closeEditAddressModal, open: openEditAddressModal }] = useDisclosure(false);
  const [addresses, setAddresses] = useState(user.addresses);

  const initialAddress = {
    city: '',
    country: '',
    defaultBillingAddress: false,
    defaultShippingAddress: false,
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
      defaultBillingAddress: false,
      defaultShippingAddress: false,
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
  // form.setValues({ city: editAddress.city });

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
        <BaseButton onClick={openAddAddressModal}>Add new address</BaseButton>
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
