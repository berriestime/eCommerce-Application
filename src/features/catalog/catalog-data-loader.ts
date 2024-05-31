import { LoaderFunction } from 'react-router-dom';

import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { getAllProducts, parseUrl } from './api/product-api';

const loader: LoaderFunction = async ({
  request,
}): Promise<{
  productsData: ProductProjectionPagedQueryResponse;
}> => {
  const parsedQueryParams = parseUrl(request);

  const productsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getAllProducts(parsedQueryParams);
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { productsData };
};

export { loader };
