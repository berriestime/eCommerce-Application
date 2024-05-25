import { type FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Product } from '@commercetools/platform-sdk';
import { Carousel } from '@mantine/carousel';
import { Box, Flex, Grid, Image, SimpleGrid, Spoiler, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CategoriesSection } from '@/features/root-page/components/categories-section';
import { getPrice } from '@/utils/formate-price';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  const data = useLoaderData();
  const matchesXs = useMediaQuery('(width < 48em)');
  const matchesXxs = useMediaQuery('(width < 22.5em)');

  const { productData } = data as { productData: Product };
  console.log('PRODUCT', data);

  const { discountPrice, price } = getPrice(productData);
  const { images } = productData.masterData.current.masterVariant;
  console.log(images);

  const cards = [1, 2, 3, 4, 5, 6].map((el) => (
    <Box bg="white" h="482" key={el}>
      {el}
    </Box>
  ));

  const title = (
    <Title c="bright" className={classes.productTitle}>
      {productData.masterData.current.name['en-US']}
    </Title>
  );

  return (
    <>
      <Box className="middleContainer">
        <Breadcrumbs />
        <Grid
          classNames={{
            inner: classes.gridInner,
            root: classes.grid,
          }}
          gutter={matchesXs ? 20 : 60}
          pb={100}
        >
          <Grid.Col className={classes.col} pos="relative" span={{ base: 12, sm: 7, xs: 6 }}>
            <Flex
              direction={matchesXxs ? 'column' : 'row'}
              gap={{ base: 'sm', md: 60, sm: 20 }}
              justify={{ sm: 'flex-start' }}
            >
              <Box h="100%">
                <Carousel
                  align="start"
                  classNames={{
                    controls: classes.carouselControls,
                    indicator: classes.carouselIndicator,
                    indicators: classes.carouselIndicators,
                    root: classes.carousel,
                  }}
                  height={matchesXxs ? 60 : '100%'}
                  loop
                  orientation={matchesXxs ? 'horizontal' : 'vertical'}
                  slideGap="xl"
                  slideSize={60}
                  slidesToScroll={1}
                  w={matchesXxs ? '100%' : 60}
                >
                  <Carousel.Slide bg="blue">1</Carousel.Slide>
                  <Carousel.Slide bg="cyan">2</Carousel.Slide>
                  <Carousel.Slide bg="grape">3</Carousel.Slide>
                  <Carousel.Slide bg="indigo">4</Carousel.Slide>
                  <Carousel.Slide bg="lime">5</Carousel.Slide>
                  <Carousel.Slide bg="pink">6</Carousel.Slide>
                </Carousel>
              </Box>

              <Box h="100%">
                <Image alt={'alt'} className={classes.image} fit="contain" src={images?.[0]?.url} />
              </Box>
            </Flex>
          </Grid.Col>

          <Grid.Col className={classes.col} pos="relative" span={{ base: 12, sm: 5, xs: 6 }}>
            {title}

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
          {cards}
        </SimpleGrid>
      </Box>

      <CategoriesSection />
      <Footer />
    </>
  );
};

export { ProductPage };
