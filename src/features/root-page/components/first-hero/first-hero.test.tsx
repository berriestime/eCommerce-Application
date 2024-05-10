import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { FirstHero } from './first-hero';

describe('FirstHero', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <FirstHero />
      </MemoryRouter>,
    );
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });
});
