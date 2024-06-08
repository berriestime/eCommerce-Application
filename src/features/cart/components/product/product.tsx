import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import { Box, CloseButton, Divider, Flex, Image, Skeleton, Text } from '@mantine/core';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { LANGUAGE } from '@/constants/catalog-constants';
import { removeItem, updateItemQuantity } from '@/features/cart/cartSlice';
import { type CartProduct } from '@/types/productTypes';
import { getPrice } from '@/utils/formate-price';

import classes from './product.module.css';

const Product = ({ data }: { data: CartProduct }): JSX.Element => {
  const dispatch = useDispatch();

  const { product, quantity } = data;
  const { masterVariant, name } = product;
  const { images } = masterVariant;
  const { discountPrice, price } = getPrice(product);

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

  return (
    <Box className={classes.card} mt={{ base: 0, xs: 40 }}>
      <Divider mb={20} />

      <Flex align="center" className={classes.content} gap={32}>
        <Flex align="center" className={classes.title} gap={32}>
          <Skeleton mah={88} maw={88} visible={loading}>
            {images && images.length > 0 && (
              <Image alt={name[LANGUAGE]} className={classes.image} fit="contain" src={images[0]?.url} />
            )}
          </Skeleton>
          <Text>{name[LANGUAGE]}</Text>
        </Flex>

        <Flex align="center" className={classes.priceContainer} gap={16}>
          {discountPrice ? (
            <>
              <span className={clsx(classes.price, classes.discount)}>${price}</span>
              <span className={classes.price}>${discountPrice}</span>
            </>
          ) : (
            <span className={classes.price}>${price}</span>
          )}
        </Flex>

        <Flex align="center" className={classes.counterContainer} gap={8}>
          <BaseButton onClick={() => dispatch(updateItemQuantity({ id: product.id, quantity: quantity - 1 }))}>
            -
          </BaseButton>
          {quantity}
          <BaseButton onClick={() => dispatch(updateItemQuantity({ id: product.id, quantity: quantity + 1 }))}>
            +
          </BaseButton>
        </Flex>

        <Flex align="center" className={classes.priceContainer} gap={16}>
          {discountPrice ? (
            <>
              <span className={clsx(classes.price, classes.discount)}>${price}</span>
              <span className={classes.price}>${discountPrice}</span>
            </>
          ) : (
            <span className={classes.price}>${price}</span>
          )}
        </Flex>

        <CloseButton
          classNames={{
            root: classes.closeBtn,
          }}
          onClick={() => dispatch(removeItem(product.id))}
        />
      </Flex>

      <Divider mt={20} />
    </Box>
  );
};

export { Product };
