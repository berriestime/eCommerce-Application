import type { FC } from 'react';

import { Box, Divider, Title } from '@mantine/core';

import { Footer } from '@/components/footer';

import { EmptyCart } from './components/empty-cart';
import { Product } from './components/product';

import classes from './cart-page.module.css';

const CartPage: FC = () => {
  return (
    <Box className="wrapper">
      <Box className={classes.container}>
        <Box className={classes.subcontainer} my={56}>
          <Title c="bright" className={classes.title} order={1}>
            Cart page
          </Title>
        </Box>

        <Divider mb={20} size="sm" />

        <Product />

        <EmptyCart />
      </Box>
      <Footer />
    </Box>
  );
};

export { CartPage };
