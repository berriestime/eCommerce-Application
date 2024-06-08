import { MemoryRouter } from 'react-router-dom';

import { describe, expect, test } from 'vitest';

import { customRender, screen } from '@/test-utils';

import { OrderModal } from './order-modal';

describe('OrderModal', () => {
  test('should render', () => {
    customRender(
      <MemoryRouter>
        <OrderModal close={() => {}} opened={true} submit={() => {}} text="Sorry!" title="Make An Order" />
      </MemoryRouter>,
    );
    expect(screen.getByText('Make An Order')).toBeInTheDocument();
  });
});
