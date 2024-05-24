import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { CategoryPagedQueryResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';

const CatalogPage: FC = () => {
  const data = useLoaderData();

  const { categoriesData, productsData } = data as {
    categoriesData: CategoryPagedQueryResponse;
    productsData: ProductPagedQueryResponse;
  };

  const { results: categoriesResult } = categoriesData;
  const { results: productResult } = productsData;

  const categories = categoriesResult.map((category) => (
    <Box key={category.id} mx="xl">
      <Link to={`/store/${category.key}`}>{category.name['en-GB']}</Link>
    </Box>
  ));

  const products = productResult.map((product) => (
    <Box key={product.id} mx="xl">
      <Link to={`/store/${product.masterData.current.categories[0]?.id}/${product.key}`}>
        {product.masterData.current.name['en-GB']}
      </Link>
    </Box>
  ));

  return (
    <div>
      <Breadcrumbs />
      <h1>Store page</h1>
      <h2>Categories</h2>
      {categories}
      <h2>Products</h2>
      {products}
    </div>
  );
};

export { CatalogPage };
