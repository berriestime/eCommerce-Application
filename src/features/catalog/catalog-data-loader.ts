import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import type { LoaderFunction } from 'react-router-dom';

import { getAllProducts, parseUrl } from './api/product-api';

const loader: LoaderFunction = async ({
  request,
}): Promise<{
  productsData: ProductProjectionPagedQueryResponse;
}> => {
  const parsedQueryParams = parseUrl(request);

  const productsResponse = await getAllProducts(parsedQueryParams);
  const productsData = productsResponse.body;

  return { productsData };
};

export { loader };
