import { ClientResponse, Customer, MyCustomerUpdate } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

import { getVersionUpdate } from './version';

type UserAddress = { city: string; country: string; postalCode: string; streetName: string };

async function postAddUserAddress({
  city,
  country,
  postalCode,
  streetName,
}: UserAddress): Promise<ClientResponse<Customer>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const address = {
    city,
    country,
    postalCode,
    streetName,
  };

  const updateActions: MyCustomerUpdate = {
    actions: [
      {
        action: 'addAddress',
        address: address,
      },
    ],
    version,
  };

  const response = await apiRoot
    .me()
    .post({
      body: updateActions,
    })
    .execute();

  return response;
}

async function postRemoveUserAddress(id: string): Promise<ClientResponse<Customer>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const updateActions: MyCustomerUpdate = {
    actions: [
      {
        action: 'removeAddress',
        addressId: id,
      },
    ],
    version,
  };

  const response = await apiRoot
    .me()
    .post({
      body: updateActions,
    })
    .execute();

  return response;
}

export { postAddUserAddress, postRemoveUserAddress };
