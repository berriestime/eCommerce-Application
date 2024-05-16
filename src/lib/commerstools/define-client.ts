import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { createAnonymousFlowClient } from './create-anonymous-client';

export type ApiRoots = {
  apiRootAnonymous: ByProjectKeyRequestBuilder | null;
  apiRootLogin: ByProjectKeyRequestBuilder | null;
  apiRootRefresh: ByProjectKeyRequestBuilder | null;
};

const defineApiRoot = ({ apiRootAnonymous, apiRootLogin, apiRootRefresh }: ApiRoots): ByProjectKeyRequestBuilder => {
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

export { defineApiRoot };
