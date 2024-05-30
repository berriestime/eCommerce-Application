import { Dispatch, SetStateAction } from 'react';

import { Address } from '@commercetools/platform-sdk';
import { UseFormReturnType } from '@mantine/form';

import { EditAddress } from './edit-address';

export type AddressEditModalProps = {
  addresses: Address[];
  close: () => void;
  editAddress: EditAddress;
  form: UseFormReturnType<{
    city: string;
    country: string;
    defaultBillingAddress: boolean;
    defaultShippingAddress: boolean;
    id: string | undefined;
    postalCode: string;
    streetName: string;
  }>;
  opened: boolean;
  setAddresses: Dispatch<SetStateAction<Address[]>>;
};
