import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { EmptyCart } from './empty-cart';

describe('EmptyCart', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>,
    );
    expect(screen.getByText('YOUR CART IS CURRENTLY EMPTY')).toBeInTheDocument();
  });
});
