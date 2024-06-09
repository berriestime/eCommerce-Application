import type { ReactElement } from 'react';

import { Button, Flex, Menu, Text } from '@mantine/core';

import type { AddressCardProps } from '@/features/profile/types/address-card-props';

import { MenuIcon } from '@/components/icons';
import { postRemoveUserAddress } from '@/features/profile/api/address-api';
import { addNotification } from '@/utils/show-notification';

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
  const addressTitle = `${props.postalCode}, ${transformCountryCodeIntoCountry(props.country)}, ${props.city}, ${props.streetName}`;
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
        .then(() =>
          addNotification({ message: 'Address was successfully deleted', title: 'Delete address', type: 'success' }),
        )
        .catch((error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : String(error);
          addNotification({ message: errorMessage, title: 'Error', type: 'error' });
        });
    }
  };

  return (
    <Flex className={classes.card}>
      <Flex className={classes.address} direction={'column'}>
        <Flex wrap={'wrap'}>
          <Text className={props.id === props.defaultBilling ? classes.default : classes.hidden} mr="1rem">
            {'\u2713'} Billing Address
          </Text>
          <Text className={props.id === props.defaultShipping ? classes.default : classes.hidden}>
            {'\u2713'} Shipping Address
          </Text>
        </Flex>
        {addressTitle}
      </Flex>

      <Menu position={'bottom-end'} shadow="md" width={200}>
        <Menu.Target>
          <Button
            className={classes.menu}
            onClick={() => {
              props.setEditAddress(address);
            }}
          >
            <MenuIcon />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={handleClickEdit}>Edit</Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={handleClickRemove}>Delete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}

export { AddressCard };
