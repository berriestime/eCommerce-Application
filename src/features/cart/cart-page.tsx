import { Box, Button, Divider, Flex, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { Footer } from '@/components/footer';
import { CloseIcon } from '@/components/icons';
import { useAppDispatch, useAppSelector } from '@/store';

import { EmptyCart } from './components/empty-cart';
import { OrderModal } from './components/order-modal';
// import { PriceSection } from './components/price-section';
import { Product } from './components/product';
import { PromoCode } from './components/promo-code';
import { RemoveModal as ClearCartModal } from './components/remove-modal';
import { clearCart } from './store/clear-cart';

import classes from './cart-page.module.css';

const CartPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const lineItems = useAppSelector((state) => state.cart.items);
  const isCartPending = useAppSelector((state) => state.cart.loading);
  const cart = useAppSelector((state) => state.cart);
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
  const [modalOrderOpened, { close: closeOrderModal, open: openOrderModal }] = useDisclosure(false);

  const productCards = lineItems.map((item) => <Product data={item} key={item.productId} />);

  // const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const totalDiscountedPrice = useAppSelector((state) => state.cart.totalDiscountedPrice);

  return (
    <Box className="wrapper">
      <Box className={classes.container}>
        <Flex align="center" className={clsx(classes.contentWrapper, classes.head)} my={56}>
          <Title c="bright" className={classes.title} order={1}>
            Your Cart
          </Title>

          {lineItems.length > 0 && (
            <Button
              c="#aa9f9c"
              className={classes.clearBtn}
              disabled={isCartPending}
              onClick={() => openModal()}
              variant="transparent"
            >
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
                <PromoCode />
                <Flex align="center" gap={16}>
                  {/* <PriceSection discountPriceValue={totalDiscountedPrice} priceValue={totalPrice} text="Total" /> */}
                  <Text c="#aa9f9c">Total Cost</Text> <Text c="bright">${totalDiscountedPrice}</Text>{' '}
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
            void dispatch(clearCart(cart));
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
