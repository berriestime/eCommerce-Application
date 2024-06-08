import type { ProductProjection } from '@commercetools/platform-sdk';

import type { Prices } from '@/types/productTypes';

const formatPrice = (price: string, digit: number): string => {
  const formattedPrice = `${price.slice(0, digit)}.${price.slice(digit)}`;
  return formattedPrice;
};

export const getPrice = (productData: ProductProjection): Prices => {
  const curPriceData = productData.masterVariant.prices?.[0];
  if (!curPriceData) {
    return {
      discountPrice: '0.00',
      price: '0.00',
    };
  }

  const curPrice = String(curPriceData?.value.centAmount);
  const curDiscountPrice = String(curPriceData?.discounted?.value.centAmount);
  const digit = -Math.abs(Number(curPriceData?.value.fractionDigits));

  const pricesData: Prices = {
    discountPrice: null,
    price: formatPrice(curPrice, digit),
  };

  if (curDiscountPrice !== 'undefined') {
    pricesData.discountPrice = formatPrice(curDiscountPrice, digit);
  }

  return pricesData;
};
