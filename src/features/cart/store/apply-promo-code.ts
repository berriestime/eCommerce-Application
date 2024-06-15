import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CartState } from './types';

import { postCartWithId } from '../api';

const applyPromoCode = createAsyncThunk(
  'cart/apply-promo-code',
  async (code: string, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { id, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    const updateActions: CartUpdateAction[] = [
      {
        action: 'addDiscountCode',
        code,
      },
    ];

    try {
      return postCartWithId(id, updateActions, version);
    } catch (error) {
      return rejectWithValue(String(error));
    }
  },
);

export { applyPromoCode };
