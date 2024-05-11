import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { Footer } from './footer';

describe('Footer', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByText('GitHub')).toHaveAttribute('href', 'https://github.com/berriestime/eCommerce-Application');
  });
});
