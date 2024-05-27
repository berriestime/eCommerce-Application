import {
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { getAllCategories } from './api/category-api';
import { getAllProducts } from './api/product-api';

async function loader(): Promise<{
  categoriesData: CategoryPagedQueryResponse;
  productsData: ProductProjectionPagedQueryResponse;
}> {
  const productsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getAllProducts();
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  const categoriesResponse: ClientResponse<CategoryPagedQueryResponse> = await getAllCategories();
  const categoriesData: CategoryPagedQueryResponse = categoriesResponse.body;

  return { categoriesData, productsData };
}

export { loader };
