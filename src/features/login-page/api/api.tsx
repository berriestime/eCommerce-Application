import { type CustomerSignin } from '@commercetools/platform-sdk';

import { createPasswordFlowClient } from '@/lib/commerstools/create-password-client';
import { addNotification } from '@/utils/show-notification';

const postCustomerLogin = (customer: CustomerSignin): Promise<void> => {
  const apiRootLogin = createPasswordFlowClient(customer);

  const result = apiRootLogin
    .login()
    .post({ body: customer })
    .execute()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(() =>
      addNotification({
        message: 'Customer with this username and password was not found',
        title: 'Sign In Error',
        type: 'error',
      }),
    );

  return result;
};

export { postCustomerLogin };
