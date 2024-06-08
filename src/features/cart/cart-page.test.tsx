import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { CartPage } from './cart-page';

describe('CartPage', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });
});
