import type { FC } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { CategoryPagedQueryResponse, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, SimpleGrid, Title } from '@mantine/core';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';

const CatalogPage: FC = () => {
  const data = useLoaderData();

  const { categoriesData, productsData } = data as {
    categoriesData: CategoryPagedQueryResponse;
    productsData: ProductProjectionPagedQueryResponse;
  };

  const { results: categoriesResult } = categoriesData;
  const { results: productResult } = productsData;

  const categories = categoriesResult.map((category) => (
    <Box key={category.id} mx="xl">
      <Link to={`/store/${category.key}`}>{category.name['en-US']}</Link>
    </Box>
  ));

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
        <Title c="bright">Store page</Title>

        <Title c="bright" mb={20} mt={16} order={2}>
          Categories
        </Title>
        {categories}
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
