import { type FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Product } from '@commercetools/platform-sdk';
import { Carousel } from '@mantine/carousel';
import { Box, Grid, Image, SimpleGrid, Spoiler, Text, Title } from '@mantine/core';
import { clsx } from 'clsx';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CategoriesSection } from '@/features/root-page/components/categories-section';
import { getPrice } from '@/utils/formate-price';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  const data = useLoaderData();

  const { productData } = data as { productData: Product };
  console.log('PRODUCT', data);

  const { discountPrice, price } = getPrice(productData);
  const { images } = productData.masterData.current.masterVariant;

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
          pb={100}
        >
          <Grid.Col
            className={classes.col}
            hiddenFrom="sm"
            pos="relative"
            span={{ base: 12, md: 'auto', sm: 'auto', xs: 12 }}
          >
            <Title c="bright" className={classes.productTitle} order={1}>
              {productData.masterData.current.name['en-US']}
            </Title>
          </Grid.Col>
          <Grid.Col
            className={clsx(classes.previewCol, classes.col)}
            pos="relative"
            span={{ base: 12, md: 'content', sm: 12, xs: 12 }}
            visibleFrom="md"
          >
            <Box h="100%" w={60}>
              <Carousel
                align="start"
                classNames={{
                  controls: classes.carouselControls,
                  indicator: classes.carouselIndicator,
                  indicators: classes.carouselIndicators,
                  root: classes.carousel,
                }}
                height={200}
                loop
                orientation="vertical"
                slideGap="xl"
                slideSize="33.3%"
                slidesToScroll={3}
              >
                <Carousel.Slide bg="blue">1</Carousel.Slide>
                <Carousel.Slide bg="cyan">2</Carousel.Slide>
                <Carousel.Slide bg="grape">3</Carousel.Slide>
                <Carousel.Slide bg="indigo">4</Carousel.Slide>
                <Carousel.Slide bg="lime">5</Carousel.Slide>
                <Carousel.Slide bg="pink">6</Carousel.Slide>
              </Carousel>
            </Box>
          </Grid.Col>
          <Grid.Col className={classes.col} pos="relative" span={{ base: 12, md: 'auto', sm: 'auto', xs: 12 }}>
            <Image alt={'alt'} className={classes.image} fit="contain" src={images?.[0]?.url} />

            <Box hiddenFrom="md">
              <Carousel
                align="start"
                classNames={{
                  controls: classes.carouselControls,
                  indicator: classes.carouselIndicator,
                  indicators: classes.carouselIndicators,
                  root: classes.carousel,
                }}
                height={60}
                loop
                orientation="horizontal"
                slideGap="xl"
                slideSize="33.3%"
                slidesToScroll={3}
              >
                <Carousel.Slide bg="blue">1</Carousel.Slide>
                <Carousel.Slide bg="cyan">2</Carousel.Slide>
                <Carousel.Slide bg="grape">3</Carousel.Slide>
                <Carousel.Slide bg="indigo">4</Carousel.Slide>
                <Carousel.Slide bg="lime">5</Carousel.Slide>
                <Carousel.Slide bg="pink">6</Carousel.Slide>
              </Carousel>
            </Box>
          </Grid.Col>
          <Grid.Col className={classes.col} pos="relative" span={{ base: 12, md: 'auto', sm: 'auto', xs: 12 }}>
            <Title c="bright" className={classes.productTitle} visibleFrom="sm">
              {productData.masterData.current.name['en-US']}
            </Title>

            <Title mb={20} mt={16}>
              {discountPrice && <span className={clsx(classes.price, classes.discount)}>{discountPrice} $</span>}
              <span className={classes.price}>{price} $</span>
            </Title>

            <Spoiler
              classNames={{
                control: classes.spoilerControl,
              }}
              hideLabel="Hide"
              maxHeight={200}
              showLabel="Show more"
            >
              <Text c="bright" className="commonText">
                {productData?.masterData?.current?.description?.['en-US'] || 'No description available'}
              </Text>
            </Spoiler>
          </Grid.Col>
        </Grid>

        <Text c="bright" className={classes.subtitle} mb={40}>
          YOU MAY ALSO LIKE...
        </Text>

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
