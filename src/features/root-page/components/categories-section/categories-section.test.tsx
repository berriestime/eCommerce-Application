import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { CategoriesSection } from './categories-section';

describe('CategoriesSection', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <CategoriesSection />
      </MemoryRouter>,
    );
    expect(screen.getByText('Classic Rockets')).toBeInTheDocument();
  });
});
