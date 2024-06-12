import { createAsyncThunk } from '@reduxjs/toolkit';

import { createNewCart, getActiveCart } from '../api';

const getCartByCustomerId = createAsyncThunk('cart/getCartByCustomerId', async (_: unknown, { rejectWithValue }) => {
  try {
    return await getActiveCart();
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 404) {
      return await createNewCart();
    }

    return rejectWithValue(error);
  }
});

export { getCartByCustomerId };
