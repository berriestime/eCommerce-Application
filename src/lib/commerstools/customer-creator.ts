import { ClientResponse, CustomerPagedQueryResponse, CustomerSignInResult, Project } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from './create-anonymous-client';
import { apiRootLogin } from './create-password-client';
import { apiRootRefresh } from './create-refresh-client';
import { defineClient } from './define-client';

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getProject = (): Promise<ClientResponse<Project>> => {
  const apiRoot = defineClient({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

const getCustomers = (): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
  const apiRoot = defineClient({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.customers().get().execute();
};

const createCustomer = ({
  email,
  firstName,
  lastName,
  password,
}: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}): Promise<ClientResponse<CustomerSignInResult>> => {
  const body = {
    email,
    firstName,
    lastName,
    password,
  };
  const apiRoot = defineClient({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.customers().post({ body }).execute();
};

// getCustomers().then(console.log).catch(console.error);
// createCustomer().then(console.log).catch(console.error);

export { createCustomer, getCustomers, getProject };
