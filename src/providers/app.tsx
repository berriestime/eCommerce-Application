import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import { router } from '@/routes';
import { store } from '@/store/store';
import { theme } from '@/theme';

import '@mantine/core/styles.css';

export const AppProvider = (): JSX.Element => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  );
};
