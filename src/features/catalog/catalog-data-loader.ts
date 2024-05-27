import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { getAllProducts } from './api/product-api';

async function loader(): Promise<{
  productsData: ProductProjectionPagedQueryResponse;
}> {
  const productsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getAllProducts();
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { productsData };
}

export { loader };
