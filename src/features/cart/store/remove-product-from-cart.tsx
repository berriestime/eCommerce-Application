import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CartState, RemoveLineItemPayload } from './types';

import { postCartWithId } from '../api';

const removeProductFromCart = createAsyncThunk(
  'cart/removeProduct',
  async ({ lineItemId, quantity }: RemoveLineItemPayload, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { id, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    const updateActions: CartUpdateAction[] = [
      {
        action: 'removeLineItem',
        lineItemId: lineItemId,
        ...(quantity && { quantity: quantity }),
      },
    ];

    try {
      return postCartWithId(id, updateActions, version);
    } catch (error) {
      return rejectWithValue(String(error));
    }
  },
);

export { removeProductFromCart };
