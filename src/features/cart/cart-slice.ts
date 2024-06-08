import type { Cart, CartUpdateAction, LineItem } from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { defineApiRoot } from '@/lib/commerstools/define-client';

interface CartItem {
  productId: string;
  quantity: number;
  variantId: number;
}

interface CartState {
  error: null | string;
  id: null | string; // You need to store the cart id to update it
  items: LineItem[];
  loading: boolean;
  version: number; // You also need the cart version for update actions
}

const initialState: CartState = {
  error: null,
  id: null,
  items: [],
  loading: false,
  version: 0,
};

// Async thunk to add a product to the cart
const addProductToCart = createAsyncThunk(
  'cart/addProduct',
  async (product: CartItem, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { id, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    const updateActions: CartUpdateAction[] = [
      {
        action: 'addLineItem',
        productId: product.productId,
        quantity: product.quantity,
        variantId: product.variantId,
      },
    ];

    try {
      const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
      const response = await apiRoot
        .carts()
        .withId({ ID: id })
        .post({
          body: {
            actions: updateActions,
            version: version,
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

interface RemoveLineItemPayload {
  lineItemId: string;
  quantity: number; // Optional - specify if you want to remove a specific quantity
}

// Async thunk to remove a line item from the cart
const removeProductFromCart = createAsyncThunk(
  'cart/removeProduct',
  async ({ lineItemId, quantity }: RemoveLineItemPayload, { getState, rejectWithValue }) => {
    const state = getState() as { cart: CartState };
    const { id, version } = state.cart;

    if (!id || version === undefined) {
      return rejectWithValue('Cart ID or version is missing');
    }

    // The update action for removing a line item
    const updateActions: CartUpdateAction[] = [
      {
        action: 'removeLineItem',
        lineItemId: lineItemId,
        // Include the quantity field only if a specific quantity should be removed
        ...(quantity && { quantity: quantity }),
      },
    ];

    try {
      const apiRoot = defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
      const response = await apiRoot
        .carts()
        .withId({ ID: id })
        .post({
          body: {
            actions: updateActions,
            version: version,
          },
        })
        .execute();

      return response.body;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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

export { addProductToCart, cartSlice, getCartByCustomerId, removeProductFromCart };
export default cartSlice.reducer;
