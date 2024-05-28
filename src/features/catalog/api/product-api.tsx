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

async function getAllProducts({
  priceFrom,
  priceTo,
}: {
  priceFrom: number;
  priceTo: number;
}): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });

  const filter = [`variants.price.centAmount:range (${priceFrom || '*'} to ${priceTo || '*'})`];

  const response: ClientResponse = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        expand: ['categories[*]'],
        filter,
        limit: 12,
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
        limit: 300,
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
  const whereConditions = categoryIds.map((id) => `categories(id="${id}")`).join(' or ');
  const response = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        expand: ['categories[*]'],
        limit: 12,
        offset: 0,
        where: whereConditions,
      },
    })
    .execute();

  return response;
}

export { getAllProducts, getProductById, getProductByKey, getProductsByCategoryId, getProductsByCategoryIds };
