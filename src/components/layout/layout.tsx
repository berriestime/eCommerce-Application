import { Suspense, useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom';

import { AppShell, Box, Loader } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';

import { BREAKPOINT_SM, HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MOBILE } from '@/constants/header-height';

import { Header } from '../header';

import classes from '../loader/loader.module.css';

const Layout = (): JSX.Element => {
  const { width } = useViewportSize();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigation.state === 'loading') {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [navigation.state]);

  return (
    <AppShell
      header={{ height: width > BREAKPOINT_SM ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE }}
      withBorder={false}
    >
      <AppShell.Header className="mainHeader">
        <Header />
      </AppShell.Header>

      <AppShell.Main bg="customBg" c="customColor" pos="relative">
        <Suspense
          fallback={
            <Box className={classes.box}>
              <Loader />
            </Box>
          }
        >
          <>
            {loading && (
              <Box className={classes.box} pos="fixed">
                <Loader />
              </Box>
            )}
            <Notifications bg="customBg" c="customColor" />

            <Outlet />
          </>

          <ScrollRestoration />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};

export { Layout };
