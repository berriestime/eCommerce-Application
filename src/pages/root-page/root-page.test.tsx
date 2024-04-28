import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { RootPage } from './root-page.js';

describe('RootPage', () => {
  test('should render', () => {
    render(<RootPage />);
    expect(screen.getByText('Root Page')).toBeInTheDocument();
  });
});
