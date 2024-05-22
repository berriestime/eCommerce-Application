import { ClientResponse } from '@commercetools/platform-sdk';
import { Category } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/category';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

const getCategoryById = (categoryId: string): Promise<ClientResponse<Category>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.categories().withId({ ID: categoryId }).get().execute();
};

const getCategoryByKey = (categoryKey: string): Promise<ClientResponse<Category>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.categories().withKey({ key: categoryKey }).get().execute();
};

export { getCategoryById, getCategoryByKey };
