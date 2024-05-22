import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppShell, Box, Loader } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';

import { Header } from '../header';

import classes from '../loader/loader.module.css';

const Layout = (): JSX.Element => {
  const { width } = useViewportSize();

  return (
    <AppShell header={{ height: width > 767 ? 100 : 64 }} withBorder={false}>
      <AppShell.Header c="customColor">
        <Header />
      </AppShell.Header>

      <AppShell.Main bg="customBg" c="customColor">
        <Suspense
          fallback={
            <Box className={classes.box}>
              <Loader />
            </Box>
          }
        >
          <Notifications bg="customBg" c="customColor" />

          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};

export { Layout };
