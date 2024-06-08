import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import { Box, Button, Divider, Flex, Image, Skeleton, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { CloseIcon } from '@/components/icons/close';
import { LANGUAGE } from '@/constants/catalog-constants';
import { removeItem, updateItemQuantity } from '@/features/cart/cartSlice';
import { type CartProduct } from '@/types/productTypes';
import { getPrice } from '@/utils/formate-price';

import { RemoveModal } from '../remove-modal';

import classes from './product.module.css';

const Product = ({ data }: { data: CartProduct }): JSX.Element => {
  const dispatch = useDispatch();
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);

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
          <Text c="bright">{name[LANGUAGE]}</Text>
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
          <BaseButton
            disabled={quantity === 0}
            onClick={() => dispatch(updateItemQuantity({ id: product.id, quantity: quantity - 1 }))}
          >
            -
          </BaseButton>
          <Text c="bright">{quantity}</Text>
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

        <Tooltip color="gray" label="Remove from cart" transitionProps={{ duration: 500, transition: 'fade-up' }}>
          <Button c="#aa9f9c" onClick={() => openModal()} variant="transparent">
            <CloseIcon size={20} />
          </Button>
        </Tooltip>
      </Flex>

      <RemoveModal
        close={closeModal}
        opened={modalOpened}
        submit={() => {
          dispatch(removeItem(product.id));
        }}
        text={`Are you sure you want to remove ${name[LANGUAGE]} ?`}
        title="Remove from cart"
      />

      <Divider mt={20} />
    </Box>
  );
};

export { Product };
