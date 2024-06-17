import type { LineItem } from '@commercetools/platform-sdk';

import { useEffect, useState } from 'react';

import { Box, Button, Divider, Flex, Group, Image, Skeleton, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { BaseButton } from '@/components/base-button';
import { CloseIcon } from '@/components/icons';
import { LANGUAGE } from '@/constants/catalog-constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { getPricesFromLineItem } from '@/utils/formate-price';
import { addNotification } from '@/utils/show-notification';

import { addProductToCart } from '../../store/add-product-to-cart';
import { removeProductFromCart } from '../../store/remove-product-from-cart';
import { PriceSection } from '../price-section';
import { RemoveModal } from '../remove-modal';

import classes from './product.module.css';

const Product = ({ data }: { data: LineItem }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);

  const { quantity } = data;
  const { discountedPrice: discountPrice, price } = getPricesFromLineItem(data);
  const { discountedPrice: totalDiscountPrice, price: totalPrice } = getPricesFromLineItem(data, true);
  const productId = data.productId;
  const name = data.name;
  const images = data.variant.images;

  const isCartPending = useAppSelector((state) => state.cart.loading);

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

      <Group align="center" className={classes.content} justify="space-between">
        <Flex align="center" className={classes.title} gap={32}>
          <Skeleton mah={88} maw={88} miw={88} visible={loading}>
            {images && images.length > 0 && (
              <Image alt={name[LANGUAGE]} className={classes.image} fit="contain" src={images[0]?.url} />
            )}
          </Skeleton>
          <Text c="bright">{name[LANGUAGE]}</Text>
        </Flex>

        <Box className={classes.priceWrapper}>
          <PriceSection discountPriceValue={discountPrice} priceValue={price} text="Individual price" />
        </Box>

        <Group align="center" className={classes.counterContainer} gap={8} justify="space-between">
          <BaseButton
            className={classes.btn}
            disabled={quantity === 0 || isCartPending}
            onClick={() => {
              void dispatch(removeProductFromCart({ lineItemId: data.id, quantity: 1 }));
            }}
          >
            -
          </BaseButton>
          <Text c="bright">{quantity}</Text>
          <BaseButton
            className={classes.btn}
            disabled={isCartPending}
            onClick={() => {
              void dispatch(addProductToCart({ productId, quantity: 1, variantId: data.variant.id }));
            }}
          >
            +
          </BaseButton>
        </Group>

        <Box className={classes.totalPriceWrapper}>
          <PriceSection discountPriceValue={totalDiscountPrice} priceValue={totalPrice} text="Total cost" />
        </Box>

        <Tooltip color="gray" label="Remove from cart" transitionProps={{ duration: 500, transition: 'fade-up' }}>
          <Button
            c="#aa9f9c"
            className={classes.cancelBtn}
            disabled={isCartPending}
            onClick={() => openModal()}
            variant="transparent"
          >
            <CloseIcon size={20} />
          </Button>
        </Tooltip>
      </Group>

      <RemoveModal
        close={closeModal}
        opened={modalOpened}
        submit={() => {
          void dispatch(removeProductFromCart({ lineItemId: data.id, quantity }));
          addNotification({
            message: 'Removed from cart',
            title: 'Success',
            type: 'info',
          });
        }}
        text={`Are you sure you want to remove ${name[LANGUAGE]} ?`}
        title="Remove from cart"
      />

      <Divider mt={20} />
    </Box>
  );
};

export { Product };
