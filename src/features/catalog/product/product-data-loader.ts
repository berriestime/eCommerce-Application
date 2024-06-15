import type {
  Category,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';

import type { LoaderFunctionArgs } from 'react-router-dom';

import { ID_LENGTH, MAX_CARDS_LENGTH } from '@/constants/catalog-constants';

import { getCategoryById, getCategoryByKey } from '../api/category-api';
import { getProductByKey, getProductsByCategoryId } from '../api/product-api';

async function fetchProductByKey(productKey: string): Promise<ProductProjection> {
  const productResponse: ClientResponse<ProductProjection> = await getProductByKey(productKey);
  return productResponse.body;
}

async function fetchCategoryByKeyOrId(categoryKey: string): Promise<Category> {
  const categoryResponse: ClientResponse<Category> =
    categoryKey.length < ID_LENGTH ? await getCategoryByKey(categoryKey) : await getCategoryById(categoryKey);
  return categoryResponse.body;
}

async function fetchCategoryByKey(categoryKey: string): Promise<Category> {
  const categoryResponse: ClientResponse<Category> = await getCategoryByKey(categoryKey);
  return categoryResponse.body;
}

async function fetchProductsByCategoryId(
  categoryId: string,
  productId: string,
): Promise<ProductProjectionPagedQueryResponse> {
  const cardsResponse: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsByCategoryId(
    categoryId,
    { limit: MAX_CARDS_LENGTH },
    productId,
  );
  return cardsResponse.body;
}

async function loader({ params }: LoaderFunctionArgs): Promise<{
  cardsData?: ProductProjectionPagedQueryResponse;
  categoryData?: Category;
  error?: string;
  productData?: ProductProjection;
  subcategoryData?: Category;
}> {
  const {
    categoryId: categoryKey,
    productId: productKey,
    subcategoryId: subcategoryKey,
  } = params as { categoryId: string; productId: string; subcategoryId: string };

  try {
    const productData = await fetchProductByKey(productKey);
    const categoryData = await fetchCategoryByKeyOrId(categoryKey);
    const subcategoryData = await fetchCategoryByKey(subcategoryKey);
    const cardsData = await fetchProductsByCategoryId(subcategoryData.id, productData.id);

    return { cardsData, categoryData, productData, subcategoryData };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Error fetching data.' };
  }
}

export { loader };
