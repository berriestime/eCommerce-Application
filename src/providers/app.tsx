// NOTE(berriestime): these imports must occur before any other component
// imports for proper CSS ordering.
// @see https://mantine.dev/guides/vite/#setup
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';

// eslint-disable-next-line perfectionist/sort-imports
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import { router } from '@/routes';
import { store } from '@/store/store';
import { theme } from '@/theme';

export const AppProvider = (): JSX.Element => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  );
};
