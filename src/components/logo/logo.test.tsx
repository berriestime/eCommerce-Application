import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { Logo } from './logo';

describe('Logo', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );
    expect(screen.getByText('')).toHaveAttribute('href', '/');
  });
});
