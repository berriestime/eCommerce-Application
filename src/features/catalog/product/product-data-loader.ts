import type { LoaderFunctionArgs } from 'react-router-dom';

import { Category, ClientResponse, Product, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { getCategoryById, getCategoryByKey } from '../api/category-api';
import { getProductByKey, getProductsByCategoryId } from '../api/product-api';

async function loader({ params }: LoaderFunctionArgs): Promise<{
  cardsData: ProductProjectionPagedQueryResponse;
  categoryData: Category;
  productData: Product;
  subcategoryData: Category;
}> {
  const {
    categoryId: categoryKey,
    productId: productKey,
    subcategoryId: subcategoryKey,
  } = params as { categoryId: string; productId: string; subcategoryId: string };

  const productResponse: ClientResponse<Product> = await getProductByKey(productKey);
  const productData: Product = productResponse.body;

  const categoryResponse: ClientResponse<Category> =
    categoryKey.length > 10 ? await getCategoryById(categoryKey) : await getCategoryByKey(categoryKey);
  const categoryData: Category = categoryResponse.body;

  const subcategoryResponse: ClientResponse<Category> = await getCategoryByKey(subcategoryKey);
  const subcategoryData: Category = subcategoryResponse.body;

  const cardsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsByCategoryId(
    subcategoryData.id,
  );
  const cardsData: ProductProjectionPagedQueryResponse = cardsResponse.body;

  return { cardsData, categoryData, productData, subcategoryData };
}

export { loader };
