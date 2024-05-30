import { ReactElement } from 'react';

import { Button, Flex, Menu, Title } from '@mantine/core';

import { postRemoveUserAddress } from '@/features/profile/api/address-api';
import { AddressCardProps } from '@/features/profile/types/address-card-props';

import classes from './address-card.module.css';

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
