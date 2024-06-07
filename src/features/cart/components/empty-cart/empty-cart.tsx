import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Image, Text, Title } from '@mantine/core';

import { BaseButton } from '@/components/base-button';
import { APP_ROUTE } from '@/routes/routes';

import cartEmptyImg from '../../assets/cart.png';

import classes from './empty-cart.module.css';

const EmptyCart: FC = () => {
  const navigate = useNavigate();

  return (
    <Box className={classes.subcontainer} maw={610} mt={{ base: 0, xs: 40 }} pos="relative">
      <Image className={classes.emptyCart} pos="absolute" src={cartEmptyImg} />
      <Box className={classes.emptyCard}>
        <Title c="bright" className={classes.empty} mb={28} order={2}>
          YOUR CART IS CURRENTLY EMPTY
        </Title>

        <Text c="#aa9f9c" mb={28}>
          Looks like you have not made your choice yet.
        </Text>

        <BaseButton
          c="bright"
          mx="auto"
          onClick={() => {
            navigate(`/${APP_ROUTE.Store}`);
          }}
        >
          Return To Shop
        </BaseButton>
      </Box>
    </Box>
  );
};

export { EmptyCart };
