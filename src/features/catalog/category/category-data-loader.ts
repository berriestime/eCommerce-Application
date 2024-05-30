import type { LoaderFunctionArgs } from 'react-router-dom';

import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { getCategoryByKey, getSubcategoryIds } from '../api/category-api';
import { getProductsByCategorySubtree } from '../api/product-api';

async function loader({ params }: LoaderFunctionArgs): Promise<{
  categoryData: Category;
  productsData: ProductProjectionPagedQueryResponse;
  subcategoriesData: CategoryPagedQueryResponse;
}> {
  const { categoryId: categoryKey } = params as { categoryId: string };
  const categoryResponse: ClientResponse<Category> = await getCategoryByKey(categoryKey);
  const categoryData: Category = categoryResponse.body;

  const subcategoriesResponse: ClientResponse<CategoryPagedQueryResponse> = await getSubcategoryIds(categoryData.id);
  const subcategoriesData: CategoryPagedQueryResponse = subcategoriesResponse.body;

  // const subcategoryIds = subcategoriesData.results.map((category) => category.id);

  // const productsResponse: ClientResponse<ProductProjectionPagedQueryResponse> =
  //   await getProductsByCategoryIds(subcategoryIds);
  const productsResponse = await getProductsByCategorySubtree(categoryData.id);
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { categoryData, productsData, subcategoriesData };
}

export { loader };
