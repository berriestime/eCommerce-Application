import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  ClientBuilder,
  type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';
import assert from 'assert';
import 'dotenv/config';

const { API_URL, AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } = process.env;

assert(API_URL);
assert(AUTH_URL);
assert(CLIENT_ID);
assert(CLIENT_SECRET);
assert(PROJECT_KEY);
assert(SCOPES);

const projectKey = PROJECT_KEY;
const scopes = [SCOPES];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  fetch,
  host: AUTH_URL,
  projectKey: projectKey,
  scopes,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  fetch,
  host: API_URL,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: PROJECT_KEY });

export { apiRoot, ctpClient };
