import type { Cart, CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CartItem, CartState } from './types';

import { createNewCart, postCartWithId } from '../api';

const getCart = async (getState: () => unknown): Promise<Pick<Cart, 'id' | 'version'>> => {
  const state = getState() as { cart: CartState };
  const { id, version } = state.cart;

  if (id && version !== undefined) {
    return { id, version };
  }
  {
    const { id, version } = await createNewCart();
    return { id, version };
  }
};

const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (product: CartItem, { getState, rejectWithValue }) => {
    try {
      const { id, version } = await getCart(getState);
      const updateActions: CartUpdateAction[] = [
        {
          action: 'addLineItem',
          productId: product.productId,
          quantity: product.quantity,
          variantId: product.variantId,
        },
      ];

      return postCartWithId(id, updateActions, version);
    } catch (error) {
      return rejectWithValue(String(error));
    }
  },
);

export { addProductToCart };
