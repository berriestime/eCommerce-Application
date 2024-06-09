import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CartItem, CartState } from './types';

import { postCartWithId } from '../api';

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
      return postCartWithId(id, updateActions, version);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export { addProductToCart };
