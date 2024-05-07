import { Outlet } from 'react-router-dom';

import { AppShell } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import { Header } from '../header';

const Layout = (): JSX.Element => {
  const { width } = useViewportSize();

  return (
    <AppShell header={{ height: width > 767 ? 100 : 64 }} withBorder={false}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export { Layout };
