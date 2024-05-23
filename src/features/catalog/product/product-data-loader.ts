import type { LoaderFunctionArgs } from 'react-router-dom';

import { Category, ClientResponse, Product } from '@commercetools/platform-sdk';

import { getCategoryById } from '../category/api';
import { getProductByKey } from './api';

async function loader({ params }: LoaderFunctionArgs): Promise<{ categoryData: Category; productData: Product }> {
  const { categoryId, productId: productKey } = params as { categoryId: string; productId: string };

  const productResponse: ClientResponse<Product> = await getProductByKey(productKey);
  const productData: Product = productResponse.body;

  // const categoryId = productData.masterData.current.categories[0]?.id;

  // if (categoryId === undefined) {
  //   throw new Error('categoryId === undefined');
  // }

  const categoryResponse: ClientResponse<Category> = await getCategoryById(categoryId);
  const categoryData: Category = categoryResponse.body;

  return { categoryData, productData };
}

export { loader };
