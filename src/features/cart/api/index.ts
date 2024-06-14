import type { Cart, CartUpdateAction } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

const postCartWithId = async (cartId: string, actions: CartUpdateAction[], version: number): Promise<Cart> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        actions,
        version,
      },
    })
    .execute();

  return response.body;
};

const createNewCart = async (): Promise<Cart> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot
    .me()
    .carts()
    .post({ body: { currency: 'USD', taxMode: 'External' } })
    .execute();

  return response.body;
};

const getActiveCart = async (): Promise<Cart> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot.me().activeCart().get().execute();
  return response.body;
};

const deleteActiveCart = async (cartId: string, cartVersion: number): Promise<Cart> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .delete({ queryArgs: { version: cartVersion } })
    .execute();

  return response.body;
};

export { createNewCart, deleteActiveCart, getActiveCart, postCartWithId };
