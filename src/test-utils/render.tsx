import { Provider } from 'react-redux';

import { MantineProvider } from '@mantine/core';
import { Queries, RenderResult, render as testingLibraryRender } from '@testing-library/react';

import { store } from '@/store';

import { theme } from '../theme';

export function render(ui: React.ReactNode): RenderResult<Queries, HTMLElement, HTMLElement> {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </MantineProvider>
    ),
  });
}
