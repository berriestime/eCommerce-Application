import type { Cart, LineItem } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import { formatCentAmount } from '@/utils/formate-price';

import type { CartState } from './types';

import { addProductToCart } from './add-product-to-cart';
import { applyPromoCode } from './apply-promo-code';
import { clearCart } from './clear-cart';
import { receiveCart } from './receive-cart';
import { removeProductFromCart } from './remove-product-from-cart';

const initialState: CartState = {
  error: null,
  id: null,
  items: [],
  loading: false,
  promocodeDiscount: '0.00',
  promocodeDiscountRaw: 0,
  totalFinalPrice: '0.00',
  totalFinalPriceRaw: 0,
  totalInitialPrice: '0.00',
  totalInitialPriceRaw: 0,
  totalPriceAfterCatalogDiscount: '0.00',
  totalPriceAfterCatalogDiscountRaw: 0,
  version: 0,
};

const getTotals = (items: LineItem[]): { totalInitialPrice: number; totalPriceAfterCatalogDiscount: number } => {
  let totalInitialPrice = 0;
  let totalPriceAfterCatalogDiscount = 0;
  for (const item of items) {
    const itemCentAmount = item.price.value.centAmount;
    const itemDiscountedCentAmount = item.price.discounted?.value.centAmount ?? itemCentAmount;
    totalInitialPrice += itemCentAmount * item.quantity;
    totalPriceAfterCatalogDiscount += itemDiscountedCentAmount * item.quantity;
  }

  return { totalInitialPrice, totalPriceAfterCatalogDiscount };
};

const setTotalsToState = (state: CartState, cart?: Cart): void => {
  const { totalInitialPrice, totalPriceAfterCatalogDiscount } = getTotals(state.items);
  state.totalPriceAfterCatalogDiscountRaw = totalPriceAfterCatalogDiscount;
  state.totalPriceAfterCatalogDiscount = formatCentAmount(totalPriceAfterCatalogDiscount);
  state.totalInitialPriceRaw = totalInitialPrice;
  state.totalInitialPrice = formatCentAmount(totalInitialPrice);

  const finalCentAmount = cart?.totalPrice.centAmount ?? 0;
  state.totalFinalPriceRaw = finalCentAmount;
  state.totalFinalPrice = formatCentAmount(finalCentAmount);

  const promocodeDiscountRaw = totalPriceAfterCatalogDiscount - finalCentAmount;
  state.promocodeDiscountRaw = promocodeDiscountRaw;
  state.promocodeDiscount = formatCentAmount(promocodeDiscountRaw);
};

const cartSlice = createSlice({
  extraReducers: (builder) => {
    for (const pending of [
      addProductToCart.pending,
      removeProductFromCart.pending,
      receiveCart.pending,
      clearCart.pending,
      applyPromoCode.pending,
    ]) {
      builder.addCase(pending, (state) => {
        state.loading = true;
      });
    }

    for (const fulfilled of [
      addProductToCart.fulfilled,
      removeProductFromCart.fulfilled,
      receiveCart.fulfilled,
      applyPromoCode.fulfilled,
    ]) {
      builder.addCase(fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.id = action.payload.id;
        state.version = action.payload.version;
        state.items = action.payload.lineItems;
        setTotalsToState(state, action.payload);
      });
    }

    for (const rejected of [
      addProductToCart.rejected,
      removeProductFromCart.rejected,
      receiveCart.rejected,
      clearCart.rejected,
      applyPromoCode.rejected,
    ]) {
      builder.addCase(rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    }

    // special case because we don't receive cart from backend
    builder.addCase(clearCart.fulfilled, (state) => {
      state.loading = false;
      state.id = null;
      state.version = 0;
      state.items = [];
      setTotalsToState(state);
    });
  },
  initialState,
  name: 'cart',
  reducers: {
    forceClearCart: (state) => {
      state.loading = false;
      state.id = null;
      state.version = 0;
      state.items = [];
      setTotalsToState(state);
    },
    forceSetCart: (state, action: PayloadAction<Cart | undefined>) => {
      if (!action.payload) {
        return;
      }
      state.id = action.payload.id;
      state.version = action.payload.version;
      state.items = action.payload.lineItems;
      setTotalsToState(state, action.payload);
    },
  },
});

const {
  actions: { forceClearCart, forceSetCart },
  reducer: cartReducer,
} = cartSlice;
export { cartReducer, cartSlice, forceClearCart, forceSetCart };
