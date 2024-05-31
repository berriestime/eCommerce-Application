import { ReactElement } from 'react';

import { Button, Flex, Menu, Text } from '@mantine/core';

import { MenuIcon } from '@/components/icons/menu';
import { postRemoveUserAddress } from '@/features/profile/api/address-api';
import { AddressCardProps } from '@/features/profile/types/address-card-props';
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
      <Text className={classes.address}>
        <Flex direction={'column'}>
          <p className={props.id === props.defaultBilling ? classes.default : classes.hidden}>
            Default Billing Address
          </p>
          <p className={props.id === props.defaultShipping ? classes.default : classes.hidden}>
            Default Shipping Address
          </p>
        </Flex>
        {addressTitle}
      </Text>

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
