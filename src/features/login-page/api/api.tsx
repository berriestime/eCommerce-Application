import type { ClientResponse, CustomerSignin } from '@commercetools/platform-sdk';

import { forceSetCartState } from '@/features/cart/store/cart-slice';
import { createPasswordFlowClient } from '@/lib/commerstools/create-password-client';
import { destroyApiRoots } from '@/lib/commerstools/define-client';
import { store } from '@/store';

const postCustomerLogin = async (customer: CustomerSignin): Promise<ClientResponse> => {
  const cart = store.getState().cart;
  destroyApiRoots();
  const apiRoot = createPasswordFlowClient(customer);

  if (!cart.id) {
    return await apiRoot.login().post({ body: customer }).execute();
  }

  const action: CustomerSignin = {
    anonymousCart: { id: cart.id, typeId: 'cart' },
    anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    email: customer.email,
    password: customer.password,
  };

  const response = await apiRoot.login().post({ body: action }).execute();
  store.dispatch(forceSetCartState(response.body.cart));
  return response;
};

export { postCustomerLogin };
