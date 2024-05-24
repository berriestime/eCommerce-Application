import { CategoryPagedQueryResponse, ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';

import { getAllCategories } from './api/category-api';
import { getAllProducts } from './api/product-api';

async function loader(): Promise<{
  categoriesData: CategoryPagedQueryResponse;
  productsData: ProductPagedQueryResponse;
}> {
  const productsResponse: ClientResponse<ProductPagedQueryResponse> = await getAllProducts();
  const productsData: ProductPagedQueryResponse = productsResponse.body;

  const categoriesResponse: ClientResponse<CategoryPagedQueryResponse> = await getAllCategories();
  const categoriesData: CategoryPagedQueryResponse = categoriesResponse.body;

  return { categoriesData, productsData };
}

export { loader };
