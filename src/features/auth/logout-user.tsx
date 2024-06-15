import { createAnonymousFlowClient } from '@/lib/commerstools/create-anonymous-client';
import { type ApiRoots, destroyApiRoots } from '@/lib/commerstools/define-client';
import { store } from '@/store';

import { forceClearCart } from '../cart/store/cart-slice';

const logoutUser = ({ apiRootAnonymous, apiRootLogin, apiRootRefresh }: ApiRoots): ApiRoots => {
  destroyApiRoots();

  createAnonymousFlowClient();
  // apiRootAnonymous.get().execute().catch(console.error);

  store.dispatch(forceClearCart());

  return { apiRootAnonymous, apiRootLogin, apiRootRefresh };
};

export { logoutUser };
