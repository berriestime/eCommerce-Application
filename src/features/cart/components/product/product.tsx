import type { LineItem } from '@commercetools/platform-sdk';

import { type ReactElement, useEffect, useState } from 'react';

import { Box, Button, Divider, Flex, Group, Image, Skeleton, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { CloseIcon } from '@/components/icons';
import { LANGUAGE } from '@/constants/catalog-constants';
import { useAppDispatch } from '@/store';
import { getPricesFromLineItem } from '@/utils/formate-price';

import { addProductToCart, removeProductFromCart } from '../../cart-slice';
import { RemoveModal } from '../remove-modal';

import classes from './product.module.css';

const Product = ({ data }: { data: LineItem }): JSX.Element => {
  const dispatch = useAppDispatch();
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);

  const { quantity } = data;
  const { discountPrice, price } = getPricesFromLineItem(data);
  const productId = data.productId;
  const name = data.name;
  const images = data.variant.images;

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

  const priceText = (text: string): ReactElement => {
    return (
      <Text c="#aa9f9c" fz={12} miw="100%">
        {text}
      </Text>
    );
  };

  const priceSection = ({
    discountPriceValue,
    priceValue,
    text,
  }: {
    discountPriceValue: null | string;
    priceValue: string;
    text: string;
  }): ReactElement => {
    return (
      <Flex align="center" className={classes.priceContainer} wrap="wrap">
        {discountPriceValue ? (
          <>
            <Text className={clsx(classes.price, classes.discount)} mr={8}>
              ${priceValue}
            </Text>
            <Text className={classes.price}>${discountPriceValue}</Text>
            {priceText(text)}
          </>
        ) : (
          <>
            <span className={classes.price}>${priceValue}</span>
            {priceText(text)}
          </>
        )}
      </Flex>
    );
  };

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
          {priceSection({ discountPriceValue: discountPrice, priceValue: price, text: 'individual price' })}
        </Box>

        <Group align="center" className={classes.counterContainer} gap={8} justify="space-between">
          <BaseButton
            disabled={quantity === 0}
            onClick={() => {
              void dispatch(removeProductFromCart({ lineItemId: data.id, quantity: 1 }));
            }}
          >
            -
          </BaseButton>
          <Text c="bright">{quantity}</Text>
          <BaseButton
            onClick={() => {
              void dispatch(addProductToCart({ productId, quantity: 1, variantId: data.variant.id }));
            }}
          >
            +
          </BaseButton>
        </Group>

        <Box className={classes.totalPriceWrapper}>
          {priceSection({ discountPriceValue: discountPrice, priceValue: price, text: 'Total cost' })}
        </Box>

        <Tooltip color="gray" label="Remove from cart" transitionProps={{ duration: 500, transition: 'fade-up' }}>
          <Button c="#aa9f9c" className={classes.cancelBtn} onClick={() => openModal()} variant="transparent">
            <CloseIcon size={20} />
          </Button>
        </Tooltip>
      </Group>

      <RemoveModal
        close={closeModal}
        opened={modalOpened}
        submit={() => {
          void dispatch(removeProductFromCart({ lineItemId: data.id, quantity }));
        }}
        text={`Are you sure you want to remove ${name[LANGUAGE]} ?`}
        title="Remove from cart"
      />

      <Divider mt={20} />
    </Box>
  );
};

export { Product };
