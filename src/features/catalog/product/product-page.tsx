import type { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Product } from '@commercetools/platform-sdk';
import { Box, Grid, SimpleGrid, Text, Title } from '@mantine/core';
import { clsx } from 'clsx';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CategoriesSection } from '@/features/root-page/components/categories-section';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  const data = useLoaderData();

  const { productData } = data as { productData: Product };
  console.log('PRODUCT', data);

  return (
    <>
      <Box className="middleContainer">
        <Breadcrumbs />
        <Grid
          classNames={{
            inner: classes.gridInner,
            root: classes.grid,
          }}
          gutter={0}
          pb="xl"
        >
          <Grid.Col
            className={clsx(classes.previewCol, classes.col)}
            h="100px"
            pos="relative"
            span={{ base: 12, xs: 'content' }}
          >
            <Box bg="white" h="100%" w="60px">
              1
            </Box>
          </Grid.Col>
          <Grid.Col className={classes.col} h="410px" pos="relative" span={{ base: 12, xs: 'auto' }}>
            <Box bg="white" h="100%">
              2
            </Box>
          </Grid.Col>
          <Grid.Col className={classes.col} h="410px" pos="relative" span={{ base: 12, xs: 'auto' }}>
            <Title order={1}>{productData.masterData.current.name['en-US']}</Title>

            <Title my="md" order={2}>
              price
            </Title>

            <Text>{productData?.masterData?.current?.description?.['en-US'] || 'No description available'}</Text>
          </Grid.Col>
        </Grid>

        <SimpleGrid className={classes.cardsGap} cols={3} mt="xl" spacing="60">
          <Box bg="white" h="482">
            1
          </Box>

          <Box bg="white" h="482">
            1
          </Box>

          <Box bg="white" h="482">
            1
          </Box>
          <Box bg="white" h="482">
            1
          </Box>

          <Box bg="white" h="482">
            1
          </Box>

          <Box bg="white" h="482">
            1
          </Box>
        </SimpleGrid>
      </Box>

      <CategoriesSection />
      <Footer />
    </>
  );
};

export { ProductPage };
