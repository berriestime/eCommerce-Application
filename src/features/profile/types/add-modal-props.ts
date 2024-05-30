import { Dispatch, SetStateAction } from 'react';

import { Address } from '@commercetools/platform-sdk';

export type AddressAddModalProps = {
  addresses: Address[];
  close: () => void;
  opened: boolean;
  setAddresses: Dispatch<SetStateAction<Address[]>>;
  setBilling: Dispatch<SetStateAction<null | string>>;
  setShipping: Dispatch<SetStateAction<null | string>>;
};
