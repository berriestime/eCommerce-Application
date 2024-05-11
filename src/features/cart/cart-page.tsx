import type { FC } from 'react';

import { Button } from '@mantine/core';

import { addNotification } from '@/components/notification';

import s from './cart-page.module.css';

const CartPage: FC = () => {
  return (
    <div className={s.container}>
      <h2>Cart page</h2>
      <Button color="teal" onClick={() => addNotification({ type: 'success' })}>
        Success notification
      </Button>

      <Button color="red" onClick={() => addNotification({ title: 'Error notification', type: 'error' })}>
        Error notification
      </Button>
    </div>
  );
};

export { CartPage };
