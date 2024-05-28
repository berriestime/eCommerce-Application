import { Dispatch, ReactElement, SetStateAction } from 'react';

import { Address } from '@commercetools/platform-sdk';
import { Button, Flex, Menu, Title } from '@mantine/core';

import { postRemoveUserAddress } from '@/features/profile/api/address-api';

type AddressCardProps = {
  addresses: Address[];
  city?: string;
  country: string;
  id?: string;
  postalCode?: string;
  setAddresses: Dispatch<SetStateAction<Address[]>>;
  streetName?: string;
};

function AddressCard(props: AddressCardProps): ReactElement {
  const fullAddress = `${props.postalCode}, ${props.country}, ${props.city}, ${props.streetName}`;

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
        <Title order={3}>{fullAddress}</Title>
        <Menu position={'bottom-end'} shadow="md" width={200}>
          <Menu.Target>
            <Button>menu</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Edit</Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={handleClickRemove}>Remove</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </>
  );
}

export { AddressCard };
