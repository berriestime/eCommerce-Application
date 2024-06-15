import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type ProductProjection } from '@commercetools/platform-sdk';
import { Badge, Box, Card, Image, Skeleton, Text } from '@mantine/core';
import { createSelector } from '@reduxjs/toolkit';
import { clsx } from 'clsx';

import type { RootState } from '@/store';

import { BaseButton } from '@/components/base-button';
import { DISCOUNT_SIZE, LANGUAGE } from '@/constants/catalog-constants';
import { addProductToCart } from '@/features/cart/store/add-product-to-cart';
import { removeProductFromCart } from '@/features/cart/store/remove-product-from-cart';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPricesFromProductProjection } from '@/utils/formate-price';

import classes from './common-card.module.css';

const selectLineItemFromCartByID = createSelector(
  [(state: RootState) => state.cart.items, (_: RootState, currentItemId: string) => currentItemId],
  (items, currentItemId) => items.find((item) => item.productId === currentItemId),
);

const CommonCard = ({ data, url }: { data: ProductProjection; url: string }): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { masterVariant, metaDescription, name } = data;
  const { images } = masterVariant;
  const { discountedPrice, price } = getPricesFromProductProjection(data);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (images && images.length > 0) {
      const img = new window.Image();
      img.src = images[0]?.url || '';
      img.onload = () => {
        setLoading(false);
      };
    } else {
      setLoading(false);
    }
  }, [images]);

  const isCartPending = useAppSelector((state) => state.cart.loading);
  const lineItemFromCart = useAppSelector((state) => selectLineItemFromCartByID(state, data.id));
  const isItemInCart = !!lineItemFromCart;

  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!(event.target as HTMLElement).closest('.addToCartButton') && !isCartPending) {
      navigate(url);
    } else {
      setLoadingBtn(true);
    }
  };

  return (
    <Card
      bg="customBg"
      className={clsx(classes.card, { [classes.userSelect || '']: isCartPending })}
      onClick={handleCardClick}
      pt={20}
      w="100%"
    >
      <Card.Section className={classes.imageSection}>
        <Skeleton mih={200} visible={loading}>
          {images && images.length > 0 && (
            <Image alt={name[LANGUAGE]} className={classes.image} fit="cover" src={images[0]?.url} />
          )}

          {discountedPrice && (
            <Badge className={classes.badge} size="xl" variant="transparent">
              {DISCOUNT_SIZE}
            </Badge>
          )}
        </Skeleton>
      </Card.Section>

      <Card.Section className={classes.info}>
        <Text className={classes.title} mt={24}>
          {name[LANGUAGE]}
        </Text>

        {metaDescription?.[LANGUAGE] && (
          <Text className={classes.description} mt={12}>
            {metaDescription[LANGUAGE]}
          </Text>
        )}
      </Card.Section>

      <Box mt="auto">
        <Text mb={20} mt={24}>
          {discountedPrice ? (
            <>
              <span className={clsx(classes.price, classes.discount)}>${price}</span>
              <span className={classes.price}>${discountedPrice}</span>
            </>
          ) : (
            <span className={classes.price}>${price}</span>
          )}
        </Text>
        {isItemInCart && (
          <BaseButton
            c="bright"
            className={clsx('addToCartButton', { [classes.userSelect || '']: isCartPending })}
            disabled={isCartPending}
            fullWidth
            loaderProps={{ type: 'dots' }}
            loading={loadingBtn}
            onClick={(event) => {
              event.preventDefault();

              void dispatch(
                removeProductFromCart({ lineItemId: lineItemFromCart.id, quantity: lineItemFromCart.quantity }),
              ).then(() => setLoadingBtn(false));
            }}
          >
            Remove From Cart
          </BaseButton>
        )}
        {!isItemInCart && (
          <BaseButton
            c="bright"
            className={clsx('addToCartButton', { [classes.userSelect || '']: isCartPending })}
            disabled={isCartPending}
            fullWidth
            loaderProps={{ type: 'dots' }}
            loading={loadingBtn}
            onClick={(event) => {
              event.preventDefault();
              void dispatch(
                addProductToCart({ productId: data.id, quantity: 1, variantId: data.masterVariant.id }),
              ).then(() => setLoadingBtn(false));
            }}
          >
            Add To Cart
          </BaseButton>
        )}
      </Box>
    </Card>
  );
};

export { CommonCard };
