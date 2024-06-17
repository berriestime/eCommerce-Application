import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CartState } from './types';

import { postCartWithId } from '../api';

const removePromoCode = createAsyncThunk(
  'cart/remove-promo-code',
  async (discountCodeID: string, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { id, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    const updateActions: CartUpdateAction[] = [
      {
        action: 'removeDiscountCode',
        discountCode: {
          id: discountCodeID,
          typeId: 'discount-code',
        },
      },
    ];

    try {
      return postCartWithId(id, updateActions, version);
    } catch (error) {
      return rejectWithValue(String(error));
    }
  },
);

export { removePromoCode };
