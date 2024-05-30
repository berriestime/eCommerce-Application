import { Dispatch, ReactElement, SetStateAction } from 'react';

import { Address } from '@commercetools/platform-sdk';
import { Button, Flex, Menu, Title } from '@mantine/core';
import { SetValues } from 'node_modules/@mantine/form/lib/types';

import { postRemoveUserAddress } from '@/features/profile/api/address-api';

import classes from './address-card.module.css';

export type EditAddress = {
  city: string | undefined;
  country: string;
  defaultBillingAddress: boolean;
  defaultShippingAddress: boolean;
  id: string | undefined;
  postalCode: string | undefined;
  streetName: string | undefined;
};

type AddressCardProps = {
  addresses: Address[];
  city?: string;
  country: string;
  defaultBilling: null | string;
  defaultShipping: null | string;
  editAddress: EditAddress | undefined;
  id?: string;
  openEditModal: () => void;
  postalCode?: string;
  setAddresses: Dispatch<SetStateAction<Address[]>>;
  setEditAddress: Dispatch<SetStateAction<EditAddress>>;
  setValues: SetValues<{
    city: string;
    country: string;
    defaultBillingAddress: boolean;
    defaultShippingAddress: boolean;
    id: string | undefined;
    postalCode: string;
    streetName: string;
  }>;
  streetName?: string;
};

const transformCountryCodeIntoCountry = (country: string): string => {
  switch (country) {
    case 'DE':
      return 'Germany';
    case 'UK':
      return 'United Kingdom';
    case 'US':
      return 'United States';
    default:
      return '';
  }
};

function AddressCard(props: AddressCardProps): ReactElement {
  const addressTitle = `${props.postalCode}, ${props.country}, ${props.city}, ${props.streetName}`;
  const address = {
    city: props.city,
    country: transformCountryCodeIntoCountry(props.country),
    defaultBillingAddress: props.defaultBilling === props.id,
    defaultShippingAddress: props.defaultShipping === props.id,
    id: props.id,
    postalCode: props.postalCode,
    streetName: props.streetName,
  };

  const handleClickEdit = (): void => {
    props.setValues(address);
    props.setEditAddress(address);
    props.openEditModal();
  };

  const handleClickRemove = (): void => {
    if (props.id) {
      postRemoveUserAddress(props.id)
        .then(() => {
          const newAddresses = props.addresses.filter((address) => address.id !== props.id);
          props.setAddresses(newAddresses);
        })
        .catch(console.warn);
    }
  };

  return (
    <>
      <Flex>
        <Title order={3}>{addressTitle}</Title>
        <p className={props.id === props.defaultBilling ? '' : classes.hidden}>Default Billing Address</p>
        <p className={props.id === props.defaultShipping ? '' : classes.hidden}>Default Shipping Address</p>
        <Menu position={'bottom-end'} shadow="md" width={200}>
          <Menu.Target>
            <Button
              onClick={() => {
                props.setEditAddress(address);
                // props.setEditDefaultBilling(props.id === props.defaultBilling);
                // props.setEditDefaultShipping(props.id === props.defaultShipping);
              }}
            >
              menu
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={handleClickEdit}>Edit</Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={handleClickRemove}>Remove</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </>
  );
}

export { AddressCard };
