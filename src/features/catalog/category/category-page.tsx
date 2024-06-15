import type { Category, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import type { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Box, SimpleGrid, Text } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';

import { Filters } from '../components/filters';
import { Pagination } from '../components/pagination';
import { Tabs } from './components';

const CategoryPage: FC = () => {
  const data = useLoaderData();

  const { categoryData, productsData, subcategoryData } = data as {
    categoryData: Category;
    productsData: ProductProjectionPagedQueryResponse;
    subcategoryData?: Category;
  };

  const showLavaFilters = categoryData.key === 'lamps';

  const { results: productResult, total } = productsData;

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
      <Tabs />
      <Filters showLavaFilters={showLavaFilters} />
      <Box className="middleContainer" pt="0">
        {(productCards.length && (
          <SimpleGrid cols={{ base: 1, sm: 3, xs: 2 }} spacing="60">
            {productCards}
          </SimpleGrid>
        )) || (
          <Text mt={'xl'} size={'xl'} ta="center">
            Sorry, there are no products matching your search
          </Text>
        )}
      </Box>
      <Pagination totalItems={total!} />
      <Footer />
    </Box>
  );
};

export { CategoryPage };
