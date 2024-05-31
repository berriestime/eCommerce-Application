import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { type CardData, SimpleCard } from './simple-card';

const cardData: CardData = {
  image: '',
  price: '$10.00',
  title: 'Sample Product',
  to: '/sample-product',
};

describe('SimpleCard', () => {
  test('renders the component with correct data', () => {
    customRender(
      <MemoryRouter>
        <SimpleCard {...cardData} />
      </MemoryRouter>,
    );

    expect(screen.getByAltText(cardData.title)).toBeInTheDocument();
    expect(screen.getByText(cardData.price)).toBeInTheDocument();
    expect(screen.getByText(cardData.title)).toBeInTheDocument();
  });
});
