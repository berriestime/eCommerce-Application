import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { Category, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, SimpleGrid, Title } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';

// import classes from './category-page.module.css';

const CategoryPage: FC = () => {
  const data = useLoaderData();

  const { categoryData, productsData } = data as {
    categoryData: Category;
    productsData: ProductProjectionPagedQueryResponse;
  };

  const { results: productResult } = productsData;

  const productCards = productResult.map((product) => {
    const { key } = product;
    return (
      <Link className="commonLink " key={key} to={`/store/${product.categories[0]?.id}/${key}`}>
        <CommonCard data={product} />
      </Link>
    );
  });

  return (
    <Box className="wrapper">
      <Box className="middleContainer">
        <Breadcrumbs />
        <Title c="bright">Category page: {categoryData.name['en-US']}</Title>

        <Title c="bright" mb={20} mt={16} order={2}>
          Products
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 3, xs: 2 }} mt="xl" spacing="60">
          {productCards}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
};

export { CategoryPage };
