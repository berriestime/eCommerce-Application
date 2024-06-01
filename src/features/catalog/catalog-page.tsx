import type { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, SimpleGrid } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';
import { Filters } from '@/features/catalog/components/filters';

import { Tabs } from './category/components';

const CatalogPage: FC = () => {
  const data = useLoaderData();

  const { productsData } = data as {
    productsData: ProductProjectionPagedQueryResponse;
  };

  const { results: productResult } = productsData;

  const productCards = productResult
    .filter((product) => product.categories[0]?.obj?.ancestors[0]?.id)
    .map((product) => {
      const { categories, key } = product;

      const subcategory = categories[0]?.obj?.key;
      const categoryId = categories[0]?.obj?.ancestors[0]?.id;

      return <CommonCard data={product} key={key} url={`/store/${categoryId}/${subcategory}/${key}`} />;
    });

  return (
    <Box className="wrapper">
      <Breadcrumbs />
      <Tabs />
      <Filters />
      <Box className="middleContainer" pt="0">
        <SimpleGrid cols={{ base: 1, sm: 3, xs: 2 }} spacing="60">
          {productCards}
        </SimpleGrid>
      </Box>
      <Footer />
    </Box>
  );
};

export { CatalogPage };
