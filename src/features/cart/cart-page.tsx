import { useState } from 'react';

import { Box, Button, Divider, Flex, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { Footer } from '@/components/footer';
import { CloseIcon } from '@/components/icons';
import { useAppSelector } from '@/store';

import { EmptyCart } from './components/empty-cart';
import { OrderModal } from './components/order-modal';
import { Product } from './components/product';
import { RemoveModal as ClearCartModal } from './components/remove-modal';

import classes from './cart-page.module.css';

const CartPage = (): JSX.Element => {
  // const dispatch = useAppDispatch(); // TODO dispatch clear cart function
  const lineItems = useAppSelector((state) => state.cart.items);
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
  const [modalOrderOpened, { close: closeOrderModal, open: openOrderModal }] = useDisclosure(false);

  const productCards = lineItems.map((item) => <Product data={item} key={item.productId} />);

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

          {lineItems.length > 0 && (
            <Button c="#aa9f9c" className={classes.clearBtn} onClick={() => openModal()} variant="transparent">
              <Text className={classes.clearText} mr={8}>
                Clear Shopping Cart
              </Text>
              <CloseIcon size={20} />
            </Button>
          )}
        </Flex>

        <Divider mb={20} size="sm" />

        <Box className={classes.contentWrapper}>{lineItems && lineItems.length > 0 ? productCards : <EmptyCart />}</Box>

        <Box className={classes.contentWrapper} my={56}>
          {lineItems.length > 0 && (
            <Box className={classes.wrapper}>
              <Flex align="center" className={classes.total} gap={32}>
                <Flex gap={32}>
                  <TextInput
                    autoComplete="nope"
                    classNames={{
                      input: classes.input,
                      label: classes.label,
                      root: classes.root,
                      wrapper: classes.wrapper,
                    }}
                    data-floating={floating}
                    label="Promo Code"
                    labelProps={{ 'data-floating': floating }}
                    onBlur={() => setFocused(false)}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    onFocus={() => setFocused(true)}
                    radius={0}
                    value={value}
                  />
                  <BaseButton disabled={value.trim().length === 0} onClick={() => console.log('Apply')}>
                    Apply
                  </BaseButton>
                </Flex>

                <Flex align="center" gap={16}>
                  <Text c="#aa9f9c">Total Cost</Text> <Text c="bright">$1000</Text>
                </Flex>
              </Flex>

              <BaseButton className={classes.orderBtn} onClick={() => openOrderModal()}>
                Make An Order
              </BaseButton>
            </Box>
          )}
        </Box>

        <ClearCartModal
          close={closeModal}
          opened={modalOpened}
          submit={() => {
            throw new Error('dispatch(clearCart());');
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
