import { MemoryRouter } from 'react-router-dom';

import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { NotFoundPage } from './not-found-page';

describe('NotFoundPage', () => {
  test('should navigate to root page when "Get back to home page" button is clicked', async () => {
    customRender(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );

    const button = screen.getByText('Get back to home page');

    await userEvent.click(button);

    expect(window.location.pathname).toBe('/');
  });
});
