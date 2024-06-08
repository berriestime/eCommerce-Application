import { useDispatch, useSelector } from 'react-redux';

import { Box, Button, Divider, Flex, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import type { RootState } from '@/store/store';

import { Footer } from '@/components/footer';
import { CloseIcon } from '@/components/icons/close';
import { clearCart } from '@/features/cart/cartSlice';
import { type CartProduct } from '@/types/productTypes';

import { EmptyCart } from './components/empty-cart';
import { Product } from './components/product';
import { RemoveModal as ClearCartModal } from './components/remove-modal';

import classes from './cart-page.module.css';

const CartPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const products: CartProduct[] = useSelector((state: RootState) => state.cart.items);
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);

  const productCards = products.map((item) => <Product data={item} key={item.product.id} />);
  return (
    <Box className="wrapper">
      <Box className={classes.container}>
        <Flex align="center" className={clsx(classes.contentWrapper, classes.head)} my={56}>
          <Title c="bright" className={classes.title} order={1}>
            Cart page
          </Title>

          {products.length > 0 && (
            <Button c="#aa9f9c" onClick={() => openModal()} variant="transparent">
              <Text className={classes.clearText} mr={8}>
                Clear Shopping Cart
              </Text>
              <CloseIcon size={20} />
            </Button>
          )}
        </Flex>

        <Divider mb={20} size="sm" />

        <Box className={classes.contentWrapper} mb={56}>
          {products && products.length > 0 ? productCards : <EmptyCart />}
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
      </Box>
      <Footer />
    </Box>
  );
};

export { CartPage };
