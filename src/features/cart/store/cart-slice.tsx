import type { Cart } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { CartState } from './types';

import { addProductToCart } from './add-product-to-cart';
import { getCartByCustomerId } from './get-cart-by-customer-id';
import { removeProductFromCart } from './remove-product-from-cart';

const initialState: CartState = {
  error: null,
  id: null,
  items: [],
  loading: false,
  version: 0,
};

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

const { reducer: cartReducer } = cartSlice;
export { cartReducer, cartSlice };
