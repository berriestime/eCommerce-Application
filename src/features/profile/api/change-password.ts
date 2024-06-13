import type { ClientResponse, CustomerChangePassword } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin, createPasswordFlowClient } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot, destroyApiRoots } from '@/lib/commerstools/define-client';

import { getVersionUpdate } from './version';

async function postChangePassword(
  id: string,
  currentPassword: string,
  newPassword: string,
  email: string,
): Promise<ClientResponse> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const version = await getVersionUpdate();

  const updateActions: CustomerChangePassword = {
    currentPassword,
    id,
    newPassword,
    version,
  };

  const response = await apiRoot.me().password().post({ body: updateActions }).execute();

  destroyApiRoots();
  const newClient = createPasswordFlowClient({ email, password: newPassword });
  newClient.get().execute().catch(console.warn);

  return response;
}

export { postChangePassword };
