import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Divider, Flex, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import type { RootState } from '@/store/store';

import { BaseButton } from '@/components/base-button';
import { Footer } from '@/components/footer';
import { CloseIcon } from '@/components/icons/close';
import { clearCart } from '@/features/cart/cartSlice';
import { type CartProduct } from '@/types/productTypes';

import { EmptyCart } from './components/empty-cart';
import { OrderModal } from './components/order-modal';
import { Product } from './components/product';
import { RemoveModal as ClearCartModal } from './components/remove-modal';

import classes from './cart-page.module.css';

const CartPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const products: CartProduct[] = useSelector((state: RootState) => state.cart.items);
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
  const [modalOrderOpened, { close: closeOrderModal, open: openOrderModal }] = useDisclosure(false);

  const productCards = products.map((item) => <Product data={item} key={item.product.id} />);

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const floating = value.trim().length !== 0 || focused || undefined;

  return (
    <Box className="wrapper">
      <Box className={classes.container}>
        <Flex align="center" className={clsx(classes.contentWrapper, classes.head)} my={56}>
          <Title c="bright" className={classes.title} order={1}>
            Your Cart
          </Title>

          {products.length > 0 && (
            <Button c="#aa9f9c" className={classes.clearBtn} onClick={() => openModal()} variant="transparent">
              <Text className={classes.clearText} mr={8}>
                Clear Shopping Cart
              </Text>
              <CloseIcon size={20} />
            </Button>
          )}
        </Flex>

        <Divider mb={20} size="sm" />

        <Box className={classes.contentWrapper}>{products && products.length > 0 ? productCards : <EmptyCart />}</Box>

        <Box className={classes.contentWrapper} my={56}>
          {products && products.length && (
            <Flex align="center" className={classes.total}>
              <TextInput
                autoComplete="nope"
                classNames={{
                  input: classes.input,
                  label: classes.label,
                  root: classes.root,
                  wrapper: classes.wrapper,
                }}
                data-floating={floating}
                label="Apply Promo Code"
                labelProps={{ 'data-floating': floating }}
                onBlur={() => setFocused(false)}
                onChange={(event) => setValue(event.currentTarget.value)}
                onFocus={() => setFocused(true)}
                radius={0}
                value={value}
              />

              <Flex align="center" gap={16}>
                <Text c="#aa9f9c">Total Cost</Text> <Text c="bright">$1000</Text>
              </Flex>

              <BaseButton onClick={() => openOrderModal()}>Make An Order</BaseButton>
            </Flex>
          )}
        </Box>

        <ClearCartModal
          close={closeModal}
          opened={modalOpened}
          submit={() => {
            dispatch(clearCart());
          }}
          text="Are you sure you want to clear shopping cart?"
          title="Clear Shopping Cart"
        />

        <OrderModal
          close={closeOrderModal}
          opened={modalOrderOpened}
          submit={() => {
            closeOrderModal();
          }}
          text="Sorry! Sorry! We have a lot of orders :("
          title="Make An Order"
        />
      </Box>
      <Footer />
    </Box>
  );
};

export { CartPage };
