import { Dispatch, SetStateAction } from 'react';

import { Address } from '@commercetools/platform-sdk';
import { SetValues } from 'node_modules/@mantine/form/lib/types';

import { EditAddress } from './edit-address';

export type AddressCardProps = {
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
