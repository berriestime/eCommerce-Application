import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { Category, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, Title } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';

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
      <Link to={`/store/${product.categories[0]?.id}/${product.key}`}>{product.name['en-US']}</Link>
    </Box>
  ));

  return (
    <Box className="wrapper">
      <Box className="middleContainer">
        <Breadcrumbs />
        <Title c="bright">Category page: {categoryData.name['en-US']}</Title>

        <Title c="bright" mb={20} mt={16} order={2}>
          Products
        </Title>
        {products}
      </Box>
      <Footer />
    </Box>
  );
};

export { CategoryPage };
