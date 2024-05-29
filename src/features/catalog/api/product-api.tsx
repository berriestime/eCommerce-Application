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
  const filter = [];
  if (priceFrom || priceTo) {
    filter.push(`variants.price.centAmount:range (${priceFrom || '*'} to ${priceTo || '*'})`);
  }
  return getProductsWithFilter(filter, ['categories[*]']);
}

async function getProductsByCategoryId(
  categoryId: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  return getProductsWithFilter([`categories.id:"${categoryId}"`]);
}

async function getProductsByCategorySubtree(
  categoryId: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  return getProductsWithFilter([`categories.id: subtree("${categoryId}")`], ['categories[*]']);
}

async function getProductsWithFilter(
  filter: string[],
  expand?: string[],
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        expand,
        filter,
        limit: 12,
        offset: 0,
      },
    })
    .execute();
  return response;
}

export { getAllProducts, getProductById, getProductByKey, getProductsByCategoryId, getProductsByCategorySubtree };
