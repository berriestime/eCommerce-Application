import type { LoaderFunctionArgs } from 'react-router-dom';

import { Category, ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { getProductsByCategoryId } from '../product/api';
import { getCategoryByKey } from './api';

async function loader({
  params,
}: LoaderFunctionArgs): Promise<{ categoryData: Category; productsData: ProductProjectionPagedQueryResponse }> {
  const { categoryId: categoryKey } = params as { categoryId: string };
  const categoryResponse: ClientResponse<Category> = await getCategoryByKey(categoryKey);
  const categoryData: Category = categoryResponse.body;

  const productsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsByCategoryId(
    categoryData.id,
  );
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { categoryData, productsData };
}

export { loader };