import type { ClientResponse, CustomerSignin } from '@commercetools/platform-sdk';

import { createPasswordFlowClient } from '@/lib/commerstools/create-password-client';

const postCustomerLogin = (customer: CustomerSignin): Promise<ClientResponse> => {
  const apiRoot = createPasswordFlowClient(customer);
  return apiRoot.login().post({ body: customer }).execute();
};

export { postCustomerLogin };
