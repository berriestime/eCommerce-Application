import { createAsyncThunk } from '@reduxjs/toolkit';

import type { CartState } from './types';

import { deleteActiveCart } from '../api';

const clearCart = createAsyncThunk('cart/clear', async (cart: CartState, { rejectWithValue }) => {
  try {
    return await deleteActiveCart(cart.id!, cart.version);
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export { clearCart };
