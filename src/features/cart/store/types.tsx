import type { LineItem } from '@commercetools/platform-sdk';

interface RemoveLineItemPayload {
  lineItemId: string;
  quantity: number; // Optional - specify if you want to remove a specific quantity
}

interface CartState {
  error: null | string;
  id: null | string; // You need to store the cart id to update it
  items: LineItem[];
  loading: boolean;
  version: number; // You also need the cart version for update actions
}

interface CartItem {
  productId: string;
  quantity: number;
  variantId: number;
}

export type { CartItem, CartState, RemoveLineItemPayload };
