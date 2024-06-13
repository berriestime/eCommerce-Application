import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test, vi } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { AboutUs } from './about-us';

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

describe('AboutUs', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>,
    );
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });
});
