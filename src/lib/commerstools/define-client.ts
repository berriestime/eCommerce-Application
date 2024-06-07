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
  const isRefreshPassword = getRefreshToken('lava-lamps-password-token');
  const isRefreshAnonymous = getRefreshToken('lava-lamps-anonymous-token');

  if (apiRootLogin) {
    return apiRootLogin;
  }

  if (apiRootRefresh) {
    return apiRootRefresh;
  }

  if (apiRootAnonymous) {
    return apiRootAnonymous;
  }

  if (isRefreshPassword && apiRootRefresh === null) {
    return createRefreshFlowClient('lava-lamps-password-token');
  } else if (isRefreshAnonymous && apiRootRefresh === null) {
    return createRefreshFlowClient('lava-lamps-anonymous-token');
  } else {
    return createAnonymousFlowClient();
  }
};

export { defineApiRoot };
