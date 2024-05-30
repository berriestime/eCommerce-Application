import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions } from '@/lib/commerstools/create-anonymous-client';

import { getRefreshToken } from './token-cache';

const { VITE_AUTH_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_PROJECT_KEY } = import.meta.env;

let apiRootRefresh: ByProjectKeyRequestBuilder | null = null;

const createRefreshFlowClient = (): ByProjectKeyRequestBuilder => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
    },
    fetch,
    host: VITE_AUTH_URL,
    projectKey: VITE_PROJECT_KEY,
    refreshToken: getRefreshToken(),
  };

  const ctpClientBuilder = new ClientBuilder()
    .withProjectKey(VITE_PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions);
  const ctpClient = import.meta.env.PROD ? ctpClientBuilder.build() : ctpClientBuilder.withLoggerMiddleware().build();

  apiRootRefresh = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: VITE_PROJECT_KEY });

  return apiRootRefresh;
};

export { apiRootRefresh, createRefreshFlowClient };
