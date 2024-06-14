import type { LineItem } from '@commercetools/platform-sdk';

interface RemoveLineItemPayload {
  lineItemId: string;
  quantity: number; // Optional - specify if you want to remove a specific quantity
}

interface CartState {
  error: null | string;
  id: null | string;
  items: LineItem[];
  loading: boolean;
  totalDiscountedPrice: null | string;
  totalDiscountedPriceRaw: number;
  totalPrice: string;
  totalPriceRaw: number;
  version: number;
}

interface CartItem {
  productId: string;
  quantity: number;
  variantId: number;
}

export type { CartItem, CartState, RemoveLineItemPayload };
