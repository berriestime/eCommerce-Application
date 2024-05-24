import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { Header } from './header';

describe('Header', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByText('Main')).toBeInTheDocument();
  });
});
