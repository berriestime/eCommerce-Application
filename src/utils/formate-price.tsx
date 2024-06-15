import type { LineItem, ProductProjection } from '@commercetools/platform-sdk';

import type { Prices } from '@/types/productTypes';

const formatCentAmount = (centAmount: number, quantity = 1): string => ((centAmount * quantity) / 100).toFixed(2);

const getPrices = (centAmount: number, discountedCentAmount: number | undefined, quantity = 1): Prices => {
  const price = formatCentAmount(centAmount, quantity);
  const discountedPrice = discountedCentAmount ? formatCentAmount(discountedCentAmount, quantity) : null;

  return {
    discountedPrice,
    price,
  };
};

const getPricesFromLineItem = (lineItem: LineItem, returnTotalPrice = false): Prices => {
  const curPriceData = lineItem.price;
  const centAmount = curPriceData.value.centAmount;
  const discountedCentAmount = curPriceData.discounted?.value.centAmount;
  const quantity = returnTotalPrice ? lineItem.quantity : 1;
  return getPrices(centAmount, discountedCentAmount, quantity);
};

const getPricesFromProductProjection = (productData: ProductProjection): Prices => {
  const curPriceData = productData.masterVariant.prices?.[0];
  if (!curPriceData) {
    return {
      discountedPrice: null,
      price: '0.00',
    };
  }
  const centAmount = curPriceData.value.centAmount;
  const discountedCentAmount = curPriceData.discounted?.value.centAmount;
  return getPrices(centAmount, discountedCentAmount);
};

export { formatCentAmount, getPricesFromLineItem, getPricesFromProductProjection };
