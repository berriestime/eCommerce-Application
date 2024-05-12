import { ByProjectKeyRequestBuilder, CustomerSignin, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, type PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions } from '@/lib/commerstools/api';
import { addNotification } from '@/utils/show-notification';

const { VITE_AUTH_URL, VITE_CLIENT_ID, VITE_CLIENT_SECRET, VITE_PROJECT_KEY, VITE_SCOPES } = import.meta.env;

const projectKey = VITE_PROJECT_KEY;
const scopes = [VITE_SCOPES];

const postCustomerLogin = (customer: CustomerSignin): Promise<void> => {
  const apiRoot = createPasswordAuthClient(customer);

  const result = apiRoot
    .login()
    .post({ body: customer })
    .execute()
    .then(({ body }) => {
      console.log(body);
    })
    .catch(console.error)
    .catch(() => addNotification({ message: 'Customer with this username and password was not found', type: 'error' }));

  return result;
};

const createPasswordAuthClient = (customer: { email: string; password: string }): ByProjectKeyRequestBuilder => {
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
  };

  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .build();

  const apiRootLogin = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: VITE_PROJECT_KEY });
  return apiRootLogin;
};

export { createPasswordAuthClient, postCustomerLogin };
