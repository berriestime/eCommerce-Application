import { type CustomerSignin } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin, createPasswordFlowClient } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineClient } from '@/lib/commerstools/define-client';

const postCustomerLogin = (customer: CustomerSignin): Promise<void> => {
  const apiRoot = createPasswordFlowClient(customer);

  const result = apiRoot
    .login()
    .post({ body: customer })
    .execute()
    .then(({ body }) => {
      console.log(body);
    });

  defineClient({ apiRootAnonymous, apiRootLogin, apiRootRefresh });

  return result;
};

export { postCustomerLogin };
