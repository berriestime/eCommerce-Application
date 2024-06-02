import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

import { createAnonymousFlowClient } from './create-anonymous-client';
import { createRefreshFlowClient } from './create-refresh-client';
import { getRefreshToken } from './token-cache';

export type ApiRoots = {
  apiRootAnonymous: ByProjectKeyRequestBuilder | null;
  apiRootLogin: ByProjectKeyRequestBuilder | null;
  apiRootRefresh: ByProjectKeyRequestBuilder | null;
};

const defineApiRoot = ({ apiRootAnonymous, apiRootLogin, apiRootRefresh }: ApiRoots): ByProjectKeyRequestBuilder => {
  const isRefresh = getRefreshToken();

  if (apiRootLogin) {
    return apiRootLogin;
  }

  if (apiRootRefresh) {
    return apiRootRefresh;
  }

  if (apiRootAnonymous) {
    return apiRootAnonymous;
  }

  if (isRefresh && apiRootRefresh === null) {
    return createRefreshFlowClient();
  } else {
    return createAnonymousFlowClient();
  }
};

export { defineApiRoot };
