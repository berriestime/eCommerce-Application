import { type FC, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Product } from '@commercetools/platform-sdk';
import { Box, Flex, Grid, Image, SimpleGrid, Spoiler, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';

import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CategoriesSection } from '@/features/root-page/components/categories-section';
import { getPrice } from '@/utils/formate-price';

import { MiniSlider } from './components/mini-slider';
import { BigSlider } from './components/slider';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  const data = useLoaderData();
  const matchesXs = useMediaQuery('(width < 48em)');
  const matchesXxs = useMediaQuery('(width < 22.5em)');

  const { productData } = data as { productData: Product };
  const { discountPrice, price } = getPrice(productData);

  const [bigSliderOpened, setOpened] = useState(false);

  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const handleImageChange = (url: string): void => {
    setCurrentImageUrl(url);
  };

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
              <MiniSlider data={productData} onImageChange={handleImageChange} />

              <Box h="100%">
                <Image
                  alt="photo"
                  className={classes.image}
                  fit="contain"
                  onClick={() => setOpened(true)}
                  src={currentImageUrl}
                />
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
      <BigSlider close={() => setOpened(false)} opened={bigSliderOpened} />
    </>
  );
};

export { ProductPage };
