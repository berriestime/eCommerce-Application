import type { Address } from '@commercetools/platform-sdk';

import type { Dispatch, SetStateAction } from 'react';

export type AddressAddModalProps = {
  addresses: Address[];
  close: () => void;
  opened: boolean;
  setAddresses: Dispatch<SetStateAction<Address[]>>;
  setBilling: Dispatch<SetStateAction<null | string>>;
  setShipping: Dispatch<SetStateAction<null | string>>;
};
