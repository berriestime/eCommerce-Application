import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions } from '@/lib/commerstools/create-anonymous-client';

const { VITE_AUTH_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_PROJECT_KEY } = import.meta.env;

let apiRootRefresh: ByProjectKeyRequestBuilder | null = null;

const createRefreshClient = (): ByProjectKeyRequestBuilder => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
    },
    fetch,
    host: VITE_AUTH_URL,
    projectKey: VITE_PROJECT_KEY,
    refreshToken: 'Function to get refresh token here', //TODO: add function to get refreshToken
    // tokenCache: TokenCache,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(VITE_PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .build();

  apiRootRefresh = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: VITE_PROJECT_KEY });
  return apiRootRefresh;
};

export { createRefreshClient };
