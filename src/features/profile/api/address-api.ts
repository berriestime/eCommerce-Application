import {
  Address,
  ClientResponse,
  Customer,
  MyCustomerChangeAddressAction,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

import { getVersionUpdate } from './version';

export type UserAddress = {
  city: string;
  country: string;
  defaultBillingAddress: boolean;
  defaultShippingAddress: boolean;
  id?: string;
  postalCode: string;
  streetName: string;
};

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

async function postDefaultBillingAddress(id: string): Promise<ClientResponse<Customer>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const updateActions: MyCustomerUpdate = {
    actions: [
      {
        action: 'setDefaultBillingAddress',
        addressId: id,
      },
      {
        action: 'addBillingAddressId',
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

async function postDefaultShippingAddress(id: string): Promise<ClientResponse<Customer>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const updateActions: MyCustomerUpdate = {
    actions: [
      {
        action: 'setDefaultShippingAddress',
        addressId: id,
      },
      {
        action: 'addShippingAddressId',
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

async function postChangeAddress(id: string, address: Address): Promise<ClientResponse<Customer>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const customerId = (await apiRoot.me().get().execute()).body.id;
  const version = await getVersionUpdate();

  const updateActions: MyCustomerChangeAddressAction = {
    action: 'changeAddress',
    address,
    addressId: id,
  };

  const response = await apiRoot
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        actions: [updateActions],
        version,
      },
    })
    .execute();

  return response;
}

export {
  postAddUserAddress,
  postChangeAddress,
  postDefaultBillingAddress,
  postDefaultShippingAddress,
  postRemoveUserAddress,
};
