import { createAsyncThunk } from '@reduxjs/toolkit';

import { getActiveCart } from '../api';

const getCartByCustomerId = createAsyncThunk('cart/getCartByCustomerId', async (_: unknown, { rejectWithValue }) => {
  try {
    return await getActiveCart();
  } catch (error) {
    return rejectWithValue(String(error));
  }
});

export { getCartByCustomerId };
