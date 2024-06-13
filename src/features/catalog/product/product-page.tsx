import type { Category, ProductProjection, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

import { Box, Flex, Grid, Image, SimpleGrid, Skeleton, Spoiler, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { createSelector } from '@reduxjs/toolkit';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { Breadcrumbs } from '@/components/brearcrumbs';
import { Footer } from '@/components/footer';
import { CommonCard } from '@/components/product-card/common-card';
import { LANGUAGE } from '@/constants/catalog-constants';
import { BREAKPOINT } from '@/constants/media-query';
import { addProductToCart } from '@/features/cart/store/add-product-to-cart';
import { removeProductFromCart } from '@/features/cart/store/remove-product-from-cart';
import { CategoriesSection } from '@/features/root-page/components/categories-section';
import { type RootState, useAppDispatch, useAppSelector } from '@/store';
import { getPricesFromProductProjection } from '@/utils/formate-price';

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
    productData: ProductProjection;
  };
  const { results: cards } = cardsData;
  const { discountPrice, price } = getPricesFromProductProjection(productData);

  const [bigSliderOpened, setOpened] = useState(false);

  const images = productData.masterVariant.images || [];
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(images[0]?.url || '');
  const [loading, setLoading] = useState(true);

  const selectLineItemFromCartByID = createSelector(
    [(state: RootState) => state.cart.items, (_: RootState, currentItemId: string) => currentItemId],
    (items, currentItemId) => items.find((item) => item.productId === currentItemId),
  );

  const dispatch = useAppDispatch();
  const isCartPending = useAppSelector((state) => state.cart.loading);
  const lineItemFromCart = useAppSelector((state) => selectLineItemFromCartByID(state, productData.id));

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
      {productData.name[LANGUAGE]}
    </Title>
  );

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
          <Grid.Col
            className={classes.col}
            mt={{ base: 20, xs: 0 }}
            pos="relative"
            span={{ base: 12, md: 7, sm: 6, xs: 6 }}
          >
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
              maxHeight={176}
              showLabel="Show more"
            >
              <Text c="bright" className="commonText">
                {productData?.description?.[LANGUAGE] || 'No description available'}
              </Text>
            </Spoiler>

            {!lineItemFromCart && (
              <BaseButton
                c="bright"
                fullWidth
                loaderProps={{ type: 'dots' }}
                loading={isCartPending}
                mt={60}
                onClick={(event) => {
                  event.preventDefault();
                  void dispatch(
                    addProductToCart({
                      productId: productData.id,
                      quantity: 1,
                      variantId: productData.masterVariant.id,
                    }),
                  );
                }}
              >
                Add To Cart
              </BaseButton>
            )}

            {lineItemFromCart && (
              <BaseButton
                c="bright"
                fullWidth
                loaderProps={{ type: 'dots' }}
                loading={isCartPending}
                mt={60}
                onClick={(event) => {
                  event.preventDefault();
                  void dispatch(
                    removeProductFromCart({ lineItemId: lineItemFromCart.id, quantity: lineItemFromCart.quantity }),
                  );
                }}
              >
                Remove From Cart
              </BaseButton>
            )}
          </Grid.Col>
        </Grid>

        <Text c="bright" className={classes.subtitle} mb={40}>
          YOU MAY ALSO LIKE...
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 3, xs: 2 }} mb={120} mt="xl" spacing="60">
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
