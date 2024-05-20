import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions } from '@/lib/commerstools/create-anonymous-client';

import { makeTokenCache } from './token-cache';

const { VITE_AUTH_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_PROJECT_KEY, VITE_SCOPES } = import.meta.env;
const projectKey = VITE_PROJECT_KEY;
const scopes = [VITE_SCOPES];

let apiRootLogin: ByProjectKeyRequestBuilder | null = null;

const createPasswordFlowClient = (customer: { email: string; password: string }): ByProjectKeyRequestBuilder => {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
      user: {
        password: customer.password,
        username: customer.email,
      },
    },
    fetch,
    host: VITE_AUTH_URL,
    projectKey: VITE_PROJECT_KEY,
    scopes,
    tokenCache: makeTokenCache(),
  };

  const ctpClientBuilder = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(passwordAuthMiddlewareOptions);
  const ctpClient = import.meta.env.PROD ? ctpClientBuilder.build() : ctpClientBuilder.withLoggerMiddleware().build();

  apiRootLogin = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: VITE_PROJECT_KEY });

  return apiRootLogin;
};

export { apiRootLogin, createPasswordFlowClient };
