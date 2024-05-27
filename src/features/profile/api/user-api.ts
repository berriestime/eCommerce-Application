import { type ClientResponse, Customer, type MyCustomerUpdate } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

async function getUserData(): Promise<ClientResponse<Customer>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot.me().get().execute();

  return response;
}

async function getVersionUpdate(): Promise<number> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const responseVersion = await apiRoot.me().get().execute();
  return responseVersion.body.version;
}

async function postUserFirstName(name: string): Promise<ClientResponse> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const updateActions: MyCustomerUpdate = {
    actions: [
      {
        action: 'setFirstName',
        firstName: name,
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

async function postUserLastName(name: string): Promise<ClientResponse> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const updateActions: MyCustomerUpdate = {
    actions: [
      {
        action: 'setLastName',
        lastName: name,
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

async function postUserDateOfBirth(date: string): Promise<ClientResponse> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const updateActions: MyCustomerUpdate = {
    actions: [
      {
        action: 'setDateOfBirth',
        dateOfBirth: date,
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

export { getUserData, postUserDateOfBirth, postUserFirstName, postUserLastName };
