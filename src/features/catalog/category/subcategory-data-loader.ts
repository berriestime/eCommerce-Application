import type { LoaderFunctionArgs } from 'react-router-dom';

import {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { getCategoryByKey, getSubcategoryIds } from '../api/category-api';
import { getProductsByCategoryId } from '../api/product-api';

async function loader({ params, request }: LoaderFunctionArgs): Promise<{
  categoryData: Category;
  productsData: ProductProjectionPagedQueryResponse;
  subcategoriesData: CategoryPagedQueryResponse;
  subcategoryData: Category;
}> {
  const { categoryId: categoryKey, subcategoryId: subcategoryKey } = params as {
    categoryId: string;
    subcategoryId: string;
  };
  const url = new URL(request.url);
  const priceFrom = parseInt(url.searchParams.get('priceFrom') ?? '');
  const priceTo = parseInt(url.searchParams.get('priceTo') ?? '');
  const categoryResponse: ClientResponse<Category> = await getCategoryByKey(categoryKey);
  const categoryData: Category = categoryResponse.body;

  const subcategoryResponse: ClientResponse<Category> = await getCategoryByKey(subcategoryKey);
  const subcategoryData: Category = subcategoryResponse.body;

  const subcategoriesResponse: ClientResponse<CategoryPagedQueryResponse> = await getSubcategoryIds(categoryData.id);
  const subcategoriesData: CategoryPagedQueryResponse = subcategoriesResponse.body;

  const productsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsByCategoryId(
    subcategoryData.id,
    { priceFrom, priceTo },
  );
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { categoryData, productsData, subcategoriesData, subcategoryData };
}

export { loader };
