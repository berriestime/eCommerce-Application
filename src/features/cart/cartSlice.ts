import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { type CartProduct } from '@/types/productTypes';

type CartState = {
  items: CartProduct[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem(state, action: PayloadAction<CartProduct>) {
      state.items.push(action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.product.id !== action.payload);
    },
    updateItemQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((item) => item.product.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, clearCart, removeItem, updateItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
