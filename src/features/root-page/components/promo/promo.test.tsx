import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { Promo } from './promo';

describe('Promo codes', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <Promo />
      </MemoryRouter>,
    );
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });
});
