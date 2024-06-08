import { useDispatch, useSelector } from 'react-redux';

import { Box, CloseButton, Divider, Title } from '@mantine/core';

import type { RootState } from '@/store/store';

import { Footer } from '@/components/footer';
import { clearCart } from '@/features/cart/cartSlice';
import { type CartProduct } from '@/types/productTypes';

import { EmptyCart } from './components/empty-cart';
import { Product } from './components/product';

import classes from './cart-page.module.css';

const CartPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const products: CartProduct[] = useSelector((state: RootState) => state.cart.items);

  const productCards = products.map((item) => <Product data={item} key={item.product.id} />);
  return (
    <Box className="wrapper">
      <Box className={classes.container}>
        <Box className={classes.contentWrapper} my={56}>
          <Title c="bright" className={classes.title} order={1}>
            Cart page
          </Title>

          <CloseButton
            classNames={{
              root: classes.closeBtn,
            }}
            onClick={() => dispatch(clearCart())}
          />
        </Box>

        <Divider mb={20} size="sm" />

        <Box className={classes.contentWrapper} mb={56}>
          {products && products.length > 0 ? productCards : <EmptyCart />}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export { CartPage };
