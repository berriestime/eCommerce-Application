import type { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Category, ClientResponse, Product } from '@commercetools/platform-sdk';

import { Breadcrumbs } from '@/components/brearcrumbs';

import { getCategoryById } from '../category/api';
import { returnProductByKey } from './api';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className={classes.container}>
      <Breadcrumbs />
    </div>
  );
};

async function loader(): Promise<{ categoryData: Category; productData: Product }> {
  const productResponse: ClientResponse<Product> = await returnProductByKey('cocktail-strainer');
  const productData: Product = productResponse.body;
  console.log(productData);

  const categoryId = productData.masterData.current.categories[0]?.id;

  if (categoryId === undefined) {
    throw new Error('categoryId === undefined');
  }

  const categoryResponse: ClientResponse<Category> = await getCategoryById(categoryId);
  const categoryData: Category = categoryResponse.body;
  console.log(categoryData);

  return { categoryData, productData };
}

export { ProductPage, loader };
