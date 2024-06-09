import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

import type { CartItem, CartState } from './types';

// Async thunk to add a product to the cart
const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (product: CartItem, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { id, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    const updateActions: CartUpdateAction[] = [
      {
        action: 'addLineItem',
        productId: product.productId,
        quantity: product.quantity,
        variantId: product.variantId,
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

export { addProductToCart };
