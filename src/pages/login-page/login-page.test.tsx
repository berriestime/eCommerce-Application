import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { LoginPage } from './login-page.js';

describe('LoginPage', () => {
  test('should render', () => {
    render(<LoginPage />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
