import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test, vi } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { TeamPage } from './team-page';

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

describe('TeamPage', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <TeamPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });
});
