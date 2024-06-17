import { useState } from 'react';

import { Flex, TextInput } from '@mantine/core';

import { BaseButton } from '@/components/base-button';
import { useAppDispatch, useAppSelector } from '@/store';
import { addNotification } from '@/utils/show-notification';

import { applyPromoCode } from '../../store/apply-promo-code';

import classes from './promo-code.module.css';

const PromoCode = (): JSX.Element => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const floating = value.trim().length !== 0 || focused || undefined;

  const isCartPending = useAppSelector((state) => state.cart.loading);
  const dispatch = useAppDispatch();

  const applyPromoCodeHandler = (): void => {
    if (!navigator.onLine) {
      addNotification({
        message: 'No internet connection. Unable to apply promo code.',
        title: 'Connection Error',
        type: 'error',
      });
      return;
    }

    const validPromoCodes = ['ROCKETS', 'BIGSAVE3000', 'NEO'];
    if (validPromoCodes.includes(value)) {
      dispatch(applyPromoCode(value))
        .unwrap()
        .then(() => {
          setValue('');
          addNotification({
            message: 'Promo code successfully applied.',
            title: 'Success',
            type: 'success',
          });
        })
        .catch((error): void => {
          console.error('An error occurred:', error);
          if (error === 'This promo code has already been applied') {
            addNotification({
              message: String(error),
              title: 'Promo Code Error',
              type: 'error',
            });
          } else {
            addNotification({
              message: String(error),
              title: 'Error',
              type: 'error',
            });
          }
        });
    } else {
      addNotification({
        message: 'Invalid promo code. Please try again.',
        title: 'Promo Code Error',
        type: 'error',
      });
    }
  };

  return (
    <Flex gap={16}>
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
        onKeyDown={(event) => {
          if (event.key === 'Enter' && value.trim().length !== 0 && !isCartPending) {
            event.preventDefault();
            applyPromoCodeHandler();
          }
        }}
        radius={0}
        value={value}
      />
      <BaseButton disabled={value.trim().length === 0 || isCartPending} onClick={applyPromoCodeHandler}>
        Apply
      </BaseButton>
    </Flex>
  );
};

export { PromoCode };
