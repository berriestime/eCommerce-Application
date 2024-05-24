import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { MantineProvider } from '@mantine/core';
import { Queries, RenderResult, render as testingLibraryRender } from '@testing-library/react';

import { store } from '@/store';

import { theme } from '../theme';

export function render(ui: ReactNode): RenderResult<Queries, HTMLElement, HTMLElement> {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <MantineProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </MantineProvider>
    ),
  });
}
