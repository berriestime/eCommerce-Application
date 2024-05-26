import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { CategoryPagedQueryResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, Title } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';

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
      <Link to={`/store/${category.key}`}>{category.name['en-US']}</Link>
    </Box>
  ));

  const products = productResult.map((product) => (
    <Box key={product.id} mx="xl">
      <Link to={`/store/${product.masterData.current.categories[0]?.id}/${product.key}`}>
        {product.masterData.current.name['en-US']}
      </Link>
    </Box>
  ));

  return (
    <Box className="wrapper">
      <Box className="middleContainer">
        <Breadcrumbs />
        <Title c="bright">Store page</Title>

        <Title c="bright" mb={20} mt={16} order={2}>
          Categories
        </Title>
        {categories}
        <Title c="bright" mb={20} mt={16} order={2}>
          Products
        </Title>
        {products}
      </Box>
      <Footer />
    </Box>
  );
};

export { CatalogPage };
