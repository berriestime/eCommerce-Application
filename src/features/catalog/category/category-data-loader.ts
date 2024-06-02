import type {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import type { LoaderFunctionArgs } from 'react-router-dom';

import { getCategoryByKey, getSubcategoryIds } from '../api/category-api';
import { getProductsByCategorySubtree, parseUrl } from '../api/product-api';

async function loader({ params, request }: LoaderFunctionArgs): Promise<{
  categoryData: Category;
  productsData: ProductProjectionPagedQueryResponse;
  subcategoriesData: CategoryPagedQueryResponse;
}> {
  const parsedQueryParams = parseUrl(request);

  const { categoryId: categoryKey } = params as { categoryId: string };
  const categoryResponse: ClientResponse<Category> = await getCategoryByKey(categoryKey);
  const categoryData: Category = categoryResponse.body;

  const subcategoriesResponse: ClientResponse<CategoryPagedQueryResponse> = await getSubcategoryIds(categoryData.id);
  const subcategoriesData: CategoryPagedQueryResponse = subcategoriesResponse.body;

  const productsResponse = await getProductsByCategorySubtree(categoryData.id, parsedQueryParams);
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { categoryData, productsData, subcategoriesData };
}

export { loader };
