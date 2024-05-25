import { type FC, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Product } from '@commercetools/platform-sdk';
import { Carousel, Embla } from '@mantine/carousel';
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
  const { discountPrice, price } = getPrice(productData);
  const images = productData.masterData.current.masterVariant.images || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [embla, setEmbla] = useState<Embla | null>(null);

  useEffect(() => {
    if (embla) {
      const onSelect = (): void => {
        setCurrentIndex(embla.selectedScrollSnap());
      };
      embla.on('select', onSelect);
      onSelect();
    }
  }, [embla]);

  const currentImageUrl = images.length > 0 ? images[currentIndex]?.url : '';

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

  const slides = images.map((image, i) => (
    <Carousel.Slide key={image.url} w={60}>
      <Box w={60}>
        <Image alt={'photo' + i} fit="contain" src={image.url} />
      </Box>
    </Carousel.Slide>
  ));

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
              {images.length > 1 && (
                <Box h="100%" ml={matchesXxs ? 40 : 0} mt={matchesXxs ? 0 : 40}>
                  <Carousel
                    align="start"
                    classNames={{
                      container: classes.carouselContainer,
                      control: classes.carouselControl,
                      controls: classes.carouselControls,
                      indicator: classes.carouselIndicator,
                      indicators: classes.carouselIndicators,
                      root: classes.carousel,
                    }}
                    getEmblaApi={setEmbla}
                    height={matchesXxs ? 60 : 220}
                    orientation={matchesXxs ? 'horizontal' : 'vertical'}
                    slideGap={{ base: 0 }}
                    slideSize={60}
                    slidesToScroll={1}
                    w={matchesXxs ? 'calc(100% - 40px)' : 60}
                  >
                    {slides}
                  </Carousel>
                </Box>
              )}

              <Box h="100%">
                <Image alt="photo" className={classes.image} fit="contain" src={currentImageUrl} />
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
