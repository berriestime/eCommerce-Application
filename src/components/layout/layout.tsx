import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppShell, Box, Loader } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';

import { BREAKPOINT_SM, HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MOBILE } from '@/constants/header-height';

import { Header } from '../header';

import classes from '../loader/loader.module.css';

const Layout = (): JSX.Element => {
  const { width } = useViewportSize();

  return (
    <AppShell
      header={{ height: width > BREAKPOINT_SM ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE }}
      withBorder={false}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Suspense
          fallback={
            <Box className={classes.box}>
              <Loader />
            </Box>
          }
        >
          <Notifications />

          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};

export { Layout };
