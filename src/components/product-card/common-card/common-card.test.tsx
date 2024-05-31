import { MemoryRouter } from 'react-router-dom';

import { CentPrecisionMoney, Price, ProductProjection } from '@commercetools/platform-sdk';
import { describe, expect, test } from 'vitest';

import { LANGUAGE } from '@/constants/catalog-constants';
import { customRender, screen } from '@/test-utils';

import { CommonCard } from './common-card';

const price: Price = {
  country: 'US',
  id: 'price-1',
  value: {
    centAmount: 1000,
    currencyCode: 'USD',
    fractionDigits: 2,
    type: 'centPrecision',
  } as CentPrecisionMoney,
};

const cardData: ProductProjection = {
  categories: [],
  createdAt: '2024-05-01T00:00:00.000Z',
  id: '1',
  lastModifiedAt: '2024-05-01T00:00:00.000Z',
  masterVariant: {
    id: 1,
    prices: [price],
    sku: 'sku-1',
  },
  metaDescription: { 'en-US': 'Sample Product Description' },
  name: { 'en-US': 'Sample Product' },
  productType: { id: '1', typeId: 'product-type' },
  slug: { 'en-US': 'sample-product' },
  variants: [],
  version: 1,
};

describe('CommonCard', () => {
  test('renders the component with correct data', () => {
    customRender(
      <MemoryRouter>
        <CommonCard data={cardData} url="" />
      </MemoryRouter>,
    );

    const productName = cardData.name[LANGUAGE];
    expect(productName).toBeDefined();

    if (cardData.metaDescription && cardData.metaDescription[LANGUAGE]) {
      const productDescription = cardData.metaDescription[LANGUAGE];
      expect(screen.getByText(productDescription)).toBeInTheDocument();
    }

    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText(productName!)).toBeInTheDocument();
  });
});
