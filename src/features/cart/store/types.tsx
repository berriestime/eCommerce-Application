import type { DiscountCodeInfo, LineItem } from '@commercetools/platform-sdk';

interface RemoveLineItemPayload {
  lineItemId: string;
  quantity: number; // Optional - specify if you want to remove a specific quantity
}

interface CartState {
  discountCodes: Array<{ code: string; id: string }>;
  discountCodesRaw: DiscountCodeInfo[];
  error: null | string;
  id: null | string;
  items: LineItem[];
  loading: boolean;
  promocodeDiscount: string;
  promocodeDiscountRaw: number;
  totalFinalPrice: string;
  totalFinalPriceRaw: number;
  totalInitialPrice: string;
  totalInitialPriceRaw: number;
  totalPriceAfterCatalogDiscount: string;
  totalPriceAfterCatalogDiscountRaw: number;
  version: number;
}

interface CartItem {
  productId: string;
  quantity: number;
  variantId: number;
}

export type { CartItem, CartState, RemoveLineItemPayload };
