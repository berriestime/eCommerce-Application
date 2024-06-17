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

  return (
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
      <BaseButton
        disabled={value.trim().length === 0 || isCartPending}
        onClick={() => {
          if (!navigator.onLine) {
            addNotification({
              message: 'No internet connection. Unable to apply promo code.',
              title: 'Connection Error',
              type: 'error',
            });
            return;
          }
          dispatch(applyPromoCode(value))
            .then(() => {
              setValue('');
            })
            .catch((error) => {
              console.error('An error occurred:', error);
              addNotification({
                message: 'Unable to apply promo code.',
                title: 'Error',
                type: 'error',
              });
            });
        }}
      >
        Apply
      </BaseButton>
    </Flex>
  );
};

export { PromoCode };
