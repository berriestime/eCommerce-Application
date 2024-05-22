import { ClientResponse, Product } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

const queryProduct = (): Promise<ClientResponse<Product>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.products().withId({ ID: '1' }).get().execute();
};

const returnProductByKey = (productKey: string): Promise<ClientResponse<Product>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.products().withKey({ key: productKey }).get().execute();
};

export { queryProduct, returnProductByKey };
