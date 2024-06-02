import { createAnonymousFlowClient } from '@/lib/commerstools/create-anonymous-client';
import { type ApiRoots } from '@/lib/commerstools/define-client';
import { deleteToken } from '@/lib/commerstools/token-cache';

const logoutUser = ({ apiRootAnonymous, apiRootLogin, apiRootRefresh }: ApiRoots): ApiRoots => {
  deleteToken();
  apiRootLogin = null;
  apiRootRefresh = null;

  apiRootAnonymous = createAnonymousFlowClient();
  apiRootAnonymous.get().execute().catch(console.error);

  return { apiRootAnonymous, apiRootLogin, apiRootRefresh };
};

export { logoutUser };
