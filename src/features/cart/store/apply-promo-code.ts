import type { CartUpdateAction } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { PROMO_3 } from '@/constants/catalog-constants';

import type { CartState } from './types';

import { postCartWithId } from '../api';

const applyPromoCode = createAsyncThunk(
  'cart/apply-promo-code',
  async (code: string, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };

    const { discountCodes, id, totalPriceAfterCatalogDiscountRaw, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    if (discountCodes.some((x) => x.code === code)) {
      return rejectWithValue('This promo code has already been applied');
    }

    const minPriceToApply = 300000;
    if (code === PROMO_3.promocode && totalPriceAfterCatalogDiscountRaw < minPriceToApply) {
      return rejectWithValue(`There are not enough products in the cart for the discount`);
    }

    const updateActions: CartUpdateAction[] = [
      {
        action: 'addDiscountCode',
        code,
      },
    ];

    try {
      return postCartWithId(id, updateActions, version);
    } catch (error) {
      return rejectWithValue(String(error));
    }
  },
);

export { applyPromoCode };
