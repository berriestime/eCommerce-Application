import { Outlet } from 'react-router-dom';

import { AppShell } from '@mantine/core';

import { Header } from '../header';

const Layout = (): JSX.Element => {
  return (
    <AppShell footer={{ height: 48 }} header={{ height: 60 }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Footer>2024</AppShell.Footer>
    </AppShell>
  );
};

export { Layout };
