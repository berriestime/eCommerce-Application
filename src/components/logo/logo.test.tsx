import { MemoryRouter } from 'react-router-dom';

import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { Logo } from './logo';

describe('Logo', () => {
  test('should navigate to root page when logo is clicked', async () => {
    customRender(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>,
    );

    const logo = screen.getByRole('link', { name: /logo/i });
    await userEvent.click(logo);

    expect(window.location.pathname).toBe('/');
  });
});
