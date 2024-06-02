import type { Customer } from '@commercetools/platform-sdk';

import { getUserData } from './api/user-api';

async function loader(): Promise<Customer> {
  const userResponse = await getUserData();
  const userData = userResponse.body;

  return userData;
}

export { loader };
