import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

import { Category, Product, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import { Box, Flex, Grid, Image, SimpleGrid, Skeleton, Spoiler, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { Breadcrumbs } from '@/components/brearcrumbs';
import { CustomSelect } from '@/components/custom-select';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';
import { BREAKPOINT } from '@/constants/media-query';
import { CategoriesSection } from '@/features/root-page/components/categories-section';
import { getPrice } from '@/utils/formate-price';

import { MiniSlider } from './components/mini-slider';
import { BigSlider } from './components/slider';

import classes from './product-page.module.css';

const ProductPage = (): JSX.Element => {
  const { subcategoryId: subcategoryKey } = useParams<{
    categoryId: string;
    subcategoryId: string;
  }>();

  const data = useLoaderData();
  const matchesLg = useMediaQuery(`(width >= ${BREAKPOINT.MD})`);
  const matchesMd = useMediaQuery(`(width < ${BREAKPOINT.MD}) and (width >= ${BREAKPOINT.XS})`);
  const matchesXxs = useMediaQuery(`(width < ${BREAKPOINT.XXS})`);

  const { cardsData, categoryData, productData } = data as {
    cardsData: ProductProjectionPagedQueryResponse;
    categoryData: Category;
    productData: Product;
  };
  const { results: cards } = cardsData;
  const { discountPrice, price } = getPrice(productData);

  const [bigSliderOpened, setOpened] = useState(false);

  const images = productData.masterData.current.masterVariant.images || [];
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(images[0]?.url || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentImageUrl) {
      setLoading(true);
      const img = new window.Image();
      img.src = currentImageUrl;
      img.onload = () => {
        setLoading(false);
      };
    } else {
      setLoading(false);
    }
  }, [currentImageUrl]);

  const handleImageChange = (url: string): void => {
    setCurrentImageUrl(url);
  };

  const title = (
    <Title c="bright" className={classes.productTitle} mt={matchesLg || matchesMd ? 0 : 40}>
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
    return <CommonCard data={productCard} key={key} url={`/store/${categoryData.key}/${subcategoryKey}/${key}`} />;
  });

  return (
    <Box className="wrapper">
      <Breadcrumbs />
      <Box className="middleContainer">
        <Grid
          classNames={{
            inner: classes.gridInner,
            root: classes.grid,
          }}
          gutter={matchesLg ? 60 : 20}
          pb={100}
        >
          <Grid.Col className={classes.col} pos="relative" span={{ base: 12, md: 7, sm: 6, xs: 6 }}>
            <Flex
              direction={matchesMd || matchesXxs ? 'column' : 'row'}
              gap={{ base: 'sm', lg: 60, md: 20 }}
              justify={{ sm: 'flex-start' }}
            >
              <MiniSlider data={productData} onImageChange={handleImageChange} />

              <Skeleton visible={loading}>
                <Box h="100%">
                  <Image
                    alt="photo"
                    className={classes.image}
                    fit="contain"
                    mah={440}
                    onClick={() => setOpened(true)}
                    src={currentImageUrl}
                  />
                </Box>
              </Skeleton>
            </Flex>
          </Grid.Col>

          <Grid.Col className={classes.col} pos="relative" span={{ base: 12, md: 5, sm: 6, xs: 6 }}>
            {title}

            <Title mb={20} mt={16} order={2}>
              {discountPrice ? (
                <>
                  <span className={clsx(classes.price, classes.discount)}>${price}</span>
                  <span className={classes.price}>${discountPrice}</span>
                </>
              ) : (
                <span className={classes.price}>${price}</span>
              )}
            </Title>

            <Spoiler
              classNames={{
                control: classes.spoilerControl,
              }}
              hideLabel="Hide"
              maxHeight={120}
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
    </Box>
  );
};

export { ProductPage };
