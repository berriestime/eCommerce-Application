import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { LogoutModal } from './logout-modal';

describe('LogoutModal', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <LogoutModal close={() => {}} opened={true} submit={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Are you sure you want to log out?')).toBeInTheDocument();
  });
});
