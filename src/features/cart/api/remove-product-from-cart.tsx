import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

import type { CartState, RemoveLineItemPayload } from './types';

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
      const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
      const response = await apiRoot
        .carts()
        .withId({ ID: id })
        .post({
          body: {
            actions: updateActions,
            version: version,
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export { removeProductFromCart };
