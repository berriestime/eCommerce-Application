import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { customRender } from '@/test-utils';

import { LoginPage } from './login-page';

describe('Login', () => {
  test('should render', () => {
    customRender(<LoginPage />);
    expect(screen.getByText('Welcome back!')).toBeInTheDocument();
  });
});
