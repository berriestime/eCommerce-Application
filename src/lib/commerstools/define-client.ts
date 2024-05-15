import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { createAnonymousFlowClient } from './create-anonymous-client';

type Clients = {
  apiRootAnonymous: ByProjectKeyRequestBuilder | null;
  apiRootLogin: ByProjectKeyRequestBuilder | null;
  apiRootRefresh: ByProjectKeyRequestBuilder | null;
};

const defineClient = ({ apiRootAnonymous, apiRootLogin, apiRootRefresh }: Clients): ByProjectKeyRequestBuilder => {
  if (apiRootLogin) {
    return apiRootLogin;
  }

  if (apiRootRefresh) {
    return apiRootRefresh;
  }

  if (apiRootAnonymous) {
    return apiRootAnonymous;
  }

  const client = createAnonymousFlowClient();
  return client;
};

export { defineClient };
