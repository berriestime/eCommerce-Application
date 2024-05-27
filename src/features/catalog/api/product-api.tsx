import { ClientResponse, Product, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

const getProductById = (): Promise<ClientResponse<Product>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.products().withId({ ID: '1' }).get().execute();
};

const getProductByKey = (productKey: string): Promise<ClientResponse<Product>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.products().withKey({ key: productKey }).get().execute();
};

// async function getAllProducts(): Promise<ClientResponse> {
//   const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
//   const response: ClientResponse = await apiRoot.products().get().execute();
//   return response;
// }

async function getAllProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response: ClientResponse = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [],
        limit: 200,
        offset: 0,
      },
    })
    .execute();
  return response;
}

async function getProductsByCategoryId(
  categoryId: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        // Используйте фильтр по ID категории
        filter: [`categories.id:"${categoryId}"`],
        // Добавьте параметры пагинации, если ожидается большое количество товаров
        limit: 20,
        offset: 0,
      },
    })
    .execute();

  return response;
}

async function getProductsByCategoryIds(
  categoryIds: string[],
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'filter.query': categoryIds.map((id) => `categories.id:"${id}"`),
        limit: 20,
        offset: 0,
      },
    })
    .execute();
  return response;
}

export { getAllProducts, getProductById, getProductByKey, getProductsByCategoryId, getProductsByCategoryIds };
