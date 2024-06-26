import type { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from './create-anonymous-client';
import { apiRootLogin } from './create-password-client';
import { apiRootRefresh } from './create-refresh-client';
import { defineApiRoot } from './define-client';

const createCustomer = (body: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.customers().post({ body }).execute();
};

export { createCustomer };
