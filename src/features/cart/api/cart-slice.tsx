import type { Cart } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

import type { CartState } from './types';

import { addProductToCart } from './add-product-to-cart';
import { removeProductFromCart } from './remove-product-from-cart';

const initialState: CartState = {
  error: null,
  id: null,
  items: [],
  loading: false,
  version: 0,
};

const getCartByCustomerId = createAsyncThunk('cart/getCartByCustomerId', async (_: unknown, { rejectWithValue }) => {
  try {
    const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
    const response = await apiRoot
      .me()
      .activeCart()
      .get()
      .execute()
      .catch(async (error) => {
        if (error instanceof Error && 'code' in error && error.code !== 404) {
          throw error;
        }

        return await apiRoot
          .me()
          .carts()
          .post({ body: { currency: 'USD', taxMode: 'External' } })
          .execute();
      });
    return response.body;
  } catch (error) {
    return rejectWithValue(error);
  }
});

// The cart slice
const cartSlice = createSlice({
  extraReducers: (builder) => {
    // add product to cart
    builder.addCase(addProductToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.loading = false;
      state.version = action.payload.version; // Update the version
      state.items = action.payload.lineItems; // Assuming the API returns the updated line items
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // remove product from cart
    builder.addCase(removeProductFromCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeProductFromCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.loading = false;
      state.version = action.payload.version; // Update the version
      state.items = action.payload.lineItems; // Assuming the API returns the updated line items
    });
    builder.addCase(removeProductFromCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // get cart by customer id
    builder.addCase(getCartByCustomerId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartByCustomerId.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.loading = false;
      state.id = action.payload.id;
      state.version = action.payload.version;
      state.items = action.payload.lineItems;
    });
    builder.addCase(getCartByCustomerId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
  initialState,
  name: 'cart',
  reducers: {},
});

export { cartSlice, getCartByCustomerId };
export default cartSlice.reducer;
