import { Product } from '@commercetools/platform-sdk';

import type { Prices } from '@/types/prodectTypes';

const fomatPrice = (price: string, digit: number): string => {
  const formattedPrice = `${price.slice(0, digit)}.${price.slice(digit)}`;
  return formattedPrice;
};

export const getPrice = (productData: Product): Prices => {
  const { prices } = productData.masterData.current.masterVariant;
  const curPriceData = prices?.find((price) => price.country === 'US');

  const curPrice = String(curPriceData?.value.centAmount);
  const curDiscountPrice = String(curPriceData?.discounted?.value.centAmount);
  const digit = -Math.abs(Number(curPriceData?.value.fractionDigits));

  const pricesData: Prices = {
    discountPrice: null,
    price: fomatPrice(curPrice, digit),
  };

  if (curDiscountPrice !== 'undefined') {
    pricesData.discountPrice = fomatPrice(curDiscountPrice, digit);
  }

  return pricesData;
};
