import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, SimpleGrid, Title } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';

import { Tabs } from './category/components';

const CatalogPage: FC = () => {
  const data = useLoaderData();

  const { productsData } = data as {
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

        <Tabs />

        <Title c="bright" mt={20}>
          Store page
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

export { CatalogPage };
