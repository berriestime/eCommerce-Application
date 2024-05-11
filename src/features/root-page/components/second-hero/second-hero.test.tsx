import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { SecondHero } from './second-hero';

describe('SecondHero', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <SecondHero />
      </MemoryRouter>,
    );
    expect(screen.getByText('YOUR SPACE')).toBeInTheDocument();
  });
});
