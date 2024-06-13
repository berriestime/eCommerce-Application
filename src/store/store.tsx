import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/authSlice';
import { cartReducer } from '@/features/cart/store/cart-slice';
import { receiveCart } from '@/features/cart/store/receive-cart';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

void store.dispatch(receiveCart(undefined));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
