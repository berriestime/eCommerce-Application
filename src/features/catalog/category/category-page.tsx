import type { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Category, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, SimpleGrid, Title } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';

import { Filters } from '../components/filters';
import { Tabs } from './components';

// import classes from './category-page.module.css';

const CategoryPage: FC = () => {
  const data = useLoaderData();

  const { categoryData, productsData, subcategoryData } = data as {
    categoryData: Category;
    productsData: ProductProjectionPagedQueryResponse;
    subcategoryData?: Category;
  };

  const showLavaFilters = categoryData.key === 'lamps';

  const { results: productResult } = productsData;

  const productCards = productResult.map((product) => {
    const { key } = product;
    const url = subcategoryData
      ? `/store/${categoryData.key}/${subcategoryData.key}`
      : `/store/${categoryData.key}/${product.categories[0]?.obj?.key}`;
    return <CommonCard data={product} key={key} url={`${url}/${key}`} />;
  });

  return (
    <Box className="wrapper">
      <Breadcrumbs />
      <Filters showLavaFilters={showLavaFilters} />
      <Tabs />
      <Box className="middleContainer">
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
