import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CartState, RemoveLineItemPayload } from './types';

import { postCartWithId } from '../api';

// Async thunk to remove a line item from the cart
const removeProductFromCart = createAsyncThunk(
  'cart/removeProduct',
  async ({ lineItemId, quantity }: RemoveLineItemPayload, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { id, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    // The update action for removing a line item
    const updateActions: CartUpdateAction[] = [
      {
        action: 'removeLineItem',
        lineItemId: lineItemId,
        // Include the quantity field only if a specific quantity should be removed
        ...(quantity && { quantity: quantity }),
      },
    ];

    try {
      return postCartWithId(id, updateActions, version);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export { removeProductFromCart };
