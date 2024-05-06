import { describe, expect, test } from 'vitest';

import { customRender, screen } from '../../test-utils';
import { Header } from './header';

describe('Header', () => {
  test('should render', () => {
    customRender(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
