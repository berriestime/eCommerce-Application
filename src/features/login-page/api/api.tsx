import type { ClientResponse, CustomerSignin } from '@commercetools/platform-sdk';

import { getActiveCart } from '@/features/cart/api';
import { createPasswordFlowClient } from '@/lib/commerstools/create-password-client';

const postCustomerLogin = async (customer: CustomerSignin): Promise<ClientResponse> => {
  const cart = await getActiveCart();
  const apiRoot = createPasswordFlowClient(customer);

  const action: CustomerSignin = {
    anonymousCart: { id: cart.id, typeId: 'cart' },
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    email: customer.email,
    password: customer.password,
  };

  return apiRoot.login().post({ body: action }).execute();
};

export { postCustomerLogin };
