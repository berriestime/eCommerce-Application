import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Layout } from './layout.js';

describe('Layout', () => {
  test('should render', () => {
    render(<Layout>Hello</Layout>);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
