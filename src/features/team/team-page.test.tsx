import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { TeamPage } from './team-page';

describe('TeamPage', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <TeamPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Team page')).toBeInTheDocument();
  });
});
