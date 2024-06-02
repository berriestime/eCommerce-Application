import type { Address } from '@commercetools/platform-sdk';
import type { UseFormReturnType } from '@mantine/form';

import type { Dispatch, SetStateAction } from 'react';

import type { EditAddress } from './edit-address';

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
  setBilling: Dispatch<SetStateAction<null | string>>;
  setShipping: Dispatch<SetStateAction<null | string>>;
};
