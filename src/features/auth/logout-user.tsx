import { createAnonymousFlowClient } from '@/lib/commerstools/create-anonymous-client';
import { type ApiRoots, destroyApiRoots } from '@/lib/commerstools/define-client';
import { store } from '@/store';

import { forceSetCartState } from '../cart/store/cart-slice';

const logoutUser = ({ apiRootAnonymous, apiRootLogin, apiRootRefresh }: ApiRoots): ApiRoots => {
  destroyApiRoots();

  createAnonymousFlowClient();
  // apiRootAnonymous.get().execute().catch(console.error);

  store.dispatch(forceSetCartState({ id: null, lineItems: [], version: 0 }));

  return { apiRootAnonymous, apiRootLogin, apiRootRefresh };
};

export { logoutUser };
