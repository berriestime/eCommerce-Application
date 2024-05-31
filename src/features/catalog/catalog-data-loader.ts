import { LoaderFunction } from 'react-router-dom';

import { ClientResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { getAllProducts } from './api/product-api';

const loader: LoaderFunction = async ({
  request,
}): Promise<{
  productsData: ProductProjectionPagedQueryResponse;
}> => {
  const url = new URL(request.url);
  const priceFrom = parseInt(url.searchParams.get('priceFrom') ?? '');
  const priceTo = parseInt(url.searchParams.get('priceTo') ?? '');
  const lavaColor = url.searchParams.get('lavaColor') ?? '';
  const lampColor = url.searchParams.get('lampColor') ?? '';

  const productsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getAllProducts({
    lampColor,
    lavaColor,
    priceFrom,
    priceTo,
  });
  const productsData: ProductProjectionPagedQueryResponse = productsResponse.body;

  return { productsData };
};

export { loader };
