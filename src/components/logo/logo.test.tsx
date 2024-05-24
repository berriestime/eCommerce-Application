import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen, userEvent } from '@/test-utils';

import { Logo } from './logo';

describe('Logo', () => {
  test('should navigate to root page when logo is clicked', async () => {
    const user = userEvent.setup();

    customRender(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const logo = screen.getByRole('link', { name: /logo/i });
    await user.click(logo);

    expect(window.location.pathname).toBe('/');
  });
});
