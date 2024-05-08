import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '../../test-utils';
import { RootPage } from './root-page';

describe('RootPage', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <RootPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });
});
