import { RouterProvider } from 'react-router-dom';

import { MantineProvider } from '@mantine/core';

import { router } from '@/routes';
import { theme } from '@/theme';

import '@mantine/core/styles.css';

export const AppProvider = (): JSX.Element => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
