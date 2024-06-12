import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import { cartReducer } from '@/features/cart/store/cart-slice';
import { getCartByCustomerId } from '@/features/cart/store/get-cart-by-customer-id';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

void store.dispatch(getCartByCustomerId(undefined));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
