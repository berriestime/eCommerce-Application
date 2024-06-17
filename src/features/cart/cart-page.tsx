import { Box, Button, CloseButton, Divider, Flex, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { Footer } from '@/components/footer';
import { CloseIcon } from '@/components/icons';
import { useAppDispatch, useAppSelector } from '@/store';
import { addNotification } from '@/utils/show-notification';

import { EmptyCart } from './components/empty-cart';
import { OrderModal } from './components/order-modal';
import { Product } from './components/product';
import { PromoCode } from './components/promo-code';
import { RemoveModal as ClearCartModal } from './components/remove-modal';
import { clearCart } from './store/clear-cart';
import { removePromoCode } from './store/remove-promo-code';

import classes from './cart-page.module.css';

const CartPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const lineItems = useAppSelector((state) => state.cart.items);
  const isCartPending = useAppSelector((state) => state.cart.loading);
  const cart = useAppSelector((state) => state.cart);
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
  const [modalOrderOpened, { close: closeOrderModal, open: openOrderModal }] = useDisclosure(false);

  const productCards = lineItems.map((item) => <Product data={item} key={item.productId} />);

  const totalPriceAfterCatalogDiscount = useAppSelector((state) => state.cart.totalPriceAfterCatalogDiscount);
  const totalFinalPrice = useAppSelector((state) => state.cart.totalFinalPrice);
  const hasDiscount = useAppSelector((state) => Boolean(state.cart.promocodeDiscountRaw));
  const promocodeDiscount = useAppSelector((state) => state.cart.promocodeDiscount);

  const activePromocodes = useAppSelector((state) => state.cart.discountCodes);
  const hasActivePromocodes = Boolean(activePromocodes.length);

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
              <Flex className={classes.total} gap={32}>
                <PromoCode />
                {hasActivePromocodes && (
                  <Stack gap={0}>
                    <Box ta={'start'}>Active promo codes:</Box>
                    {activePromocodes.map((x) => (
                      <Box className={classes.tmp} key={x.id}>
                        {x.code}
                        <CloseButton
                          onClick={() => {
                            if (!navigator.onLine) {
                              addNotification({
                                message: 'No internet connection. Unable to remove promo code.',
                                title: 'Error',
                                type: 'error',
                              });
                              return;
                            }
                            dispatch(removePromoCode(x.id)).catch((error) => {
                              console.error('An error occurred:', error);
                              addNotification({
                                message: 'Unable to remove promo code.',
                                title: 'Error',
                                type: 'error',
                              });
                            });
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
                <Flex gap={16}>
                  <Stack gap={0}>
                    {hasDiscount && <Text c="#aa9f9c">Before Promocode</Text>}
                    {hasDiscount && <Text c="#aa9f9c">Promocode Discount</Text>}
                    <Text c="#aa9f9c">Final Price</Text>
                  </Stack>
                  <Stack gap={0}>
                    {hasDiscount && (
                      <Text c="#aa9f9c" td="line-through">
                        ${totalPriceAfterCatalogDiscount}
                      </Text>
                    )}
                    {hasDiscount && <Text className={classes.sexy}>${promocodeDiscount}</Text>}
                    <Text c="bright">${totalFinalPrice}</Text>
                  </Stack>
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
          submit={async () => {
            if (!navigator.onLine) {
              addNotification({
                message: 'No internet connection. Please check your connection and try again.',
                title: 'Connection Error',
                type: 'error',
              });
              return;
            }
            try {
              const resultAction = await dispatch(clearCart(cart));

              if (clearCart.fulfilled.match(resultAction)) {
                addNotification({
                  message: 'Cart cleared',
                  title: 'Success',
                  type: 'info',
                });
              } else {
                addNotification({
                  message: 'Failed to clear cart',
                  title: 'Error',
                  type: 'error',
                });
              }
            } catch (error) {
              addNotification({
                message: 'An error occurred while clearing the cart',
                title: 'Error',
                type: 'error',
              });
            }
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
