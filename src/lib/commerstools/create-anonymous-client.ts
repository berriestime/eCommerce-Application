import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  type AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const { VITE_API_URL, VITE_AUTH_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_PROJECT_KEY, VITE_SCOPES } = import.meta
  .env;
const projectKey = VITE_PROJECT_KEY;
const scopes = [VITE_SCOPES];

let apiRootAnonymous: ByProjectKeyRequestBuilder | null = null;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  fetch,
  host: VITE_API_URL,
};

const createAnonymousFlowClient = (): ByProjectKeyRequestBuilder => {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    credentials: {
      clientId: VITE_CLIENT_ID,
      clientSecret: VITE_CLIENT_SECRET,
    },
    fetch,
    host: VITE_AUTH_URL,
    projectKey,
    scopes,
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .build();

  apiRootAnonymous = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: VITE_PROJECT_KEY });

  return apiRootAnonymous;
};

export { apiRootAnonymous, createAnonymousFlowClient, httpMiddlewareOptions };
