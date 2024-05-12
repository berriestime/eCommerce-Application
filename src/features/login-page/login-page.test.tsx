import { MemoryRouter } from 'react-router-dom';

import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { customRender } from '@/test-utils';

import { LoginPage } from './components/login-page';

describe('Login', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });
});
