import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppShell, Box, Loader } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import { Header } from '../header';

import classes from '../loader/loader.module.css';

const Layout = (): JSX.Element => {
  const { width } = useViewportSize();

  return (
    <AppShell header={{ height: width > 767 ? 100 : 64 }} withBorder={false}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Suspense
          fallback={
            <Box className={classes.box}>
              <Loader></Loader>
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};

export { Layout };
