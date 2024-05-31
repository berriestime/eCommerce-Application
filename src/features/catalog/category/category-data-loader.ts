import type { LoaderFunctionArgs } from 'react-router-dom';

import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { getCategoryByKey, getSubcategoryIds } from '../api/category-api';
import { getProductsByCategorySubtree } from '../api/product-api';

async function loader({ params, request }: LoaderFunctionArgs): Promise<{
  categoryData: Category;
  productsData: ProductProjectionPagedQueryResponse;
  subcategoriesData: CategoryPagedQueryResponse;
}> {
  const url = new URL(request.url);
  const priceFrom = parseInt(url.searchParams.get('priceFrom') ?? '');
  const priceTo = parseInt(url.searchParams.get('priceTo') ?? '');
  const lavaColor = url.searchParams.get('lavaColor') ?? '';
  const lampColor = url.searchParams.get('lampColor') ?? '';

  const { categoryId: categoryKey } = params as { categoryId: string };
  const categoryResponse: ClientResponse<Category> = await getCategoryByKey(categoryKey);
  const categoryData: Category = categoryResponse.body;

  const subcategoriesResponse: ClientResponse<CategoryPagedQueryResponse> = await getSubcategoryIds(categoryData.id);
  const subcategoriesData: CategoryPagedQueryResponse = subcategoriesResponse.body;

  const productsResponse = await getProductsByCategorySubtree(categoryData.id, {
    lampColor,
    lavaColor,
    priceFrom,
    priceTo,
  });
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { categoryData, productsData, subcategoriesData };
}

export { loader };
