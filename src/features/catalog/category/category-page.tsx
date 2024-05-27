import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { Category, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, SimpleGrid, Title } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';

import { Tabs } from './components';

// import classes from './category-page.module.css';

const CategoryPage: FC = () => {
  const data = useLoaderData();

  const { categoryData, productsData, subcategoryData } = data as {
    categoryData: Category;
    productsData: ProductProjectionPagedQueryResponse;
    subcategoryData?: Category;
  };

  const { results: productResult } = productsData;

  const productCards = productResult.map((product) => {
    const { key } = product;
    const url = subcategoryData ? `/store/${categoryData.key}/${subcategoryData.key}` : `/store/${categoryData.key}`;
    return (
      <Link className="commonLink " key={key} to={`${url}/${key}`}>
        <CommonCard data={product} />
      </Link>
    );
  });

  return (
    <Box className="wrapper">
      <Box className="middleContainer">
        <Breadcrumbs />
        <Tabs />

        <Title c="bright" mt={20}>
          Category page: {categoryData.name['en-US']}
        </Title>

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
