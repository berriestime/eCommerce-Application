import { type ProductProjection } from '@commercetools/platform-sdk';

export type Prices = {
  discountedPrice: null | string;
  price: string;
};

export type CartProduct = {
  product: ProductProjection;
  quantity: number;
  url: string;
};
