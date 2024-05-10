import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Get back to home page')).toHaveAttribute('href', '/');
  });
});
