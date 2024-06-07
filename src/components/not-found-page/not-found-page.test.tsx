import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen, userEvent } from '@/test-utils';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  test('should navigate to root page when "Get back to home page" button is clicked', async () => {
    const user = userEvent.setup();

    customRender(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const button = screen.getByText('Get back to home page');

    await user.click(button);

    expect(window.location.pathname).toBe('/');
  });
});
