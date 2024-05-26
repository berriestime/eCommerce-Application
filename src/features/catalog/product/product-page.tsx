import { type FC, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import { Product, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, Flex, Grid, Image, SimpleGrid, Spoiler, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { Breadcrumbs } from '@/components/brearcrumbs';
import { CustomSelect } from '@/components/custom-select';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';
import { CategoriesSection } from '@/features/root-page/components/categories-section';
import { getPrice } from '@/utils/formate-price';

import { MiniSlider } from './components/mini-slider';
import { BigSlider } from './components/slider';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  const data = useLoaderData();
  const matchesXs = useMediaQuery('(width < 48em)');
  const matchesXxs = useMediaQuery('(width < 22.5em)');

  const { cardsData, productData } = data as { cardsData: ProductProjectionPagedQueryResponse; productData: Product };
  const { results: cards } = cardsData;
  const { discountPrice, price } = getPrice(productData);

  const [bigSliderOpened, setOpened] = useState(false);

  const images = productData.masterData.current.masterVariant.images || [];
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(images[0]?.url || '');

  const handleImageChange = (url: string): void => {
    setCurrentImageUrl(url);
  };

  const title = (
    <Title c="bright" className={classes.productTitle} mt={matchesXs ? 20 : 0}>
      {productData.masterData.current.name['en-US']}
    </Title>
  );

  const form = useForm({
    initialValues: {
      quantity: '1',
    },
    mode: 'controlled',
  });

  const productCards = cards.map((productCard) => {
    const { key } = productCard;
    return (
      <Link className="commonLink " key={key} to={`/store/${productCard.categories[0]?.id}/${key}`}>
        <CommonCard data={productCard} />
      </Link>
    );
  });

  // const slides = productCards.map((item, i) => <Carousel.Slide key={i}>{item}</Carousel.Slide>);

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

            <Title mb={20} mt={16} order={2}>
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

            <CustomSelect
              data={['1', '2', '3', '4', '5']}
              label="Quantity"
              maw={68}
              mt={60}
              {...form.getInputProps('quantity')}
            />

            <BaseButton c="bright" fullWidth mt={10}>
              Add To Cart
            </BaseButton>
          </Grid.Col>
        </Grid>

        <Text c="bright" className={classes.subtitle} mb={40}>
          YOU MAY ALSO LIKE...
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 3, xs: 2 }} mt="xl" spacing="60">
          {productCards}
        </SimpleGrid>
      </Box>

      <CategoriesSection />
      <Footer />
      <BigSlider
        close={() => setOpened(false)}
        currentImageUrl={currentImageUrl}
        images={images}
        opened={bigSliderOpened}
      />
    </>
  );
};

export { ProductPage };
