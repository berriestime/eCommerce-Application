import type { LineItem, Price, ProductProjection } from '@commercetools/platform-sdk';

import type { Prices } from '@/types/productTypes';

const formatPrice = (price: string, digit: number): string => {
  const formattedPrice = `${price.slice(0, digit)}.${price.slice(digit)}`;
  return formattedPrice;
};

const getPricesFromLineItem = (lineItem: LineItem, returnTotalPrice = false): Prices => {
  const curPriceData = lineItem.price;
  return transformSdkPriceIntoPrices(curPriceData, returnTotalPrice ? lineItem.quantity : 1);
};

const getPricesFromProductProjection = (productData: ProductProjection): Prices => {
  const curPriceData = productData.masterVariant.prices?.[0];
  return transformSdkPriceIntoPrices(curPriceData);
};

const transformSdkPriceIntoPrices = (curPriceData: Price | undefined, quantity = 1): Prices => {
  if (!curPriceData) {
    return {
      discountPrice: '0.00',
      price: '0.00',
    };
  }

  const centAmount = curPriceData.value.centAmount;
  const curPrice = String(centAmount * quantity);
  const digit = -1 * Math.abs(curPriceData.value.fractionDigits);

  const pricesData: Prices = {
    discountPrice: null,
    price: formatPrice(curPrice, digit),
  };

  const discountedCentAmount = curPriceData.discounted?.value.centAmount;
  if (discountedCentAmount) {
    const curDiscountPrice = String(discountedCentAmount * quantity);
    pricesData.discountPrice = formatPrice(curDiscountPrice, digit);
  }

  return pricesData;
};

export { getPricesFromLineItem, getPricesFromProductProjection };
