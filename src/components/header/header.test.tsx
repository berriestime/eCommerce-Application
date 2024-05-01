import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Header } from './header.js';

describe('Header', () => {
  test('should render', () => {
    render(<Header />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
