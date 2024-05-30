import { ClientResponse, ProductProjection, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { ITEMS_PER_PAGE } from '@/constants/catalog-constants';
import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

type ParsedQueryParams = { lavaColor?: string; priceFrom?: number; priceTo?: number };

const getProductByKey = (productKey: string): Promise<ClientResponse<ProductProjection>> => {
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  return apiRoot.productProjections().withKey({ key: productKey }).get().execute();
};

async function getAllProducts(
  parsedQueryParams: ParsedQueryParams,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  return getProductsWithFilter({ expand: ['categories[*]'], parsedQueryParams });
}

async function getProductsByCategoryId(
  categoryId: string,
  parsedQueryParams?: ParsedQueryParams,
  limit = ITEMS_PER_PAGE,
  productId?: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const filter = [`categories.id:"${categoryId}"`];
  const filterQuery = productId ? [`id:"${productId}"`] : [];

  return getProductsWithFilter({ filter, filterQuery, limit, parsedQueryParams });
}

async function getProductsByCategorySubtree(
  categoryId: string,
  parsedQueryParams: ParsedQueryParams,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const filter = [`categories.id: subtree("${categoryId}")`];
  return getProductsWithFilter({
    expand: ['categories[*]'],
    filter,
    parsedQueryParams,
  });
}

async function getProductsWithFilter({
  expand,
  filter = [],
  filterQuery = [],
  limit = ITEMS_PER_PAGE,
  parsedQueryParams,
}: {
  expand?: string[];
  filter?: string[];
  filterQuery?: string[];
  limit?: number;
  parsedQueryParams?: ParsedQueryParams;
}): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  if (parsedQueryParams?.priceFrom || parsedQueryParams?.priceTo) {
    filter.push(
      `variants.price.centAmount:range(${parsedQueryParams?.priceFrom || '*'} to ${parsedQueryParams?.priceTo || '*'})`,
    );
  }
  if (parsedQueryParams?.lavaColor) {
    filter.push(`variants.attributes.lava-color-enum.key:"${parsedQueryParams?.lavaColor}"`);
  }
  const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        expand,
        filter,
        filterQuery,
        limit: limit,
        offset: 0,
      },
    })
    .execute();

  return response;
}

export { getAllProducts, getProductByKey, getProductsByCategoryId, getProductsByCategorySubtree };
