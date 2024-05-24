import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { Category, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';

// import classes from './category-page.module.css';

const CategoryPage: FC = () => {
  const data = useLoaderData();

  const { categoryData, productsData } = data as {
    categoryData: Category;
    productsData: ProductProjectionPagedQueryResponse;
  };

  const { results: productResult } = productsData;

  const products = productResult.map((product) => (
    <Box key={product.id} mx="xl">
      <Link to={`/store/${product.categories[0]?.id}/${product.key}`}>{product.name['en-GB']}</Link>
    </Box>
  ));

  return (
    <>
      <Breadcrumbs />
      <h1>Category page: {categoryData.name['en-GB']}</h1>
      <h2>Products</h2>
      {products}
    </>
  );
};

export { CategoryPage };
