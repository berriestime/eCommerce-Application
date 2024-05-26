import type { LoaderFunctionArgs } from 'react-router-dom';

import { Category, ClientResponse, Product, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { getCategoryById } from '../api/category-api';
import { getProductByKey, getProductsByCategoryId } from '../api/product-api';

async function loader({ params }: LoaderFunctionArgs): Promise<{
  cardsData: ProductProjectionPagedQueryResponse;
  categoryData: Category;
  productData: Product;
}> {
  const { categoryId, productId: productKey } = params as { categoryId: string; productId: string };

  const productResponse: ClientResponse<Product> = await getProductByKey(productKey);
  const productData: Product = productResponse.body;

  // const categoryId = productData.masterData.current.categories[0]?.id;

  // if (categoryId === undefined) {
  //   throw new Error('categoryId === undefined');
  // }

  const categoryResponse: ClientResponse<Category> = await getCategoryById(categoryId);
  const categoryData: Category = categoryResponse.body;

  const cardsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsByCategoryId(
    categoryData.id,
  );
  const cardsData: ProductProjectionPagedQueryResponse = cardsResponse.body;

  return { cardsData, categoryData, productData };
}

export { loader };
