import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { RemoveModal } from './remove-modal';

describe('ClearCartModal', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <RemoveModal
          close={() => {}}
          opened={true}
          submit={() => {}}
          text="Are you sure you want to clear shopping cart?"
          title="Clear Shopping Cart"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Are you sure you want to clear shopping cart?')).toBeInTheDocument();
  });
});
