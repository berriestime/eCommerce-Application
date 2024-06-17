import { MemoryRouter } from 'react-router-dom';

import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { customRender } from '@/test-utils';

import { RemoveModal } from './remove-modal';

describe('RemoveModal', () => {
  test('should render with text and title', () => {
    customRender(
      <MemoryRouter>
        <RemoveModal
          close={() => {}}
          opened={true}
          submit={() => Promise.resolve()}
          text="Are you sure you want to clear the shopping cart?"
          title="Clear Shopping Cart"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText('Are you sure you want to clear the shopping cart?')).toBeInTheDocument();
    expect(screen.getByText('Clear Shopping Cart')).toBeInTheDocument();
  });

  test('should call submit when the submit button is clicked', () => {
    const handleSubmit = vi.fn(() => Promise.resolve());
    customRender(
      <MemoryRouter>
        <RemoveModal
          close={() => {}}
          opened={true}
          submit={handleSubmit}
          text="Are you sure you want to clear the shopping cart?"
          title="Clear Shopping Cart"
        />
      </MemoryRouter>,
    );

    const submitButton = screen.getByText('Ok');
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalled();
  });

  test('should call close when the close button is clicked', () => {
    const handleClose = vi.fn();
    customRender(
      <MemoryRouter>
        <RemoveModal
          close={handleClose}
          opened={true}
          submit={() => Promise.resolve()}
          text="Are you sure you want to clear the shopping cart?"
          title="Clear Shopping Cart"
        />
      </MemoryRouter>,
    );

    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
