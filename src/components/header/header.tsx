import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Burger, Divider, Drawer, Group, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { clsx } from 'clsx';

import { Logo } from '@/components/logo';

import classes from './header.module.css';

const Header: FC = () => {
  const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false);
  const nav = [
    { name: 'Main', to: '/' },
    { name: 'Store', to: '/catalog' },
    { name: 'Cart', to: '/cart' },
    { name: 'Our Team', to: '/team' },
  ];

  const auth = [
    { name: 'Log In', to: '/login' },
    { name: 'Sign Up', to: '/registration' },
  ];

  const getItems = (
    elements: {
      name: string;
      to: string;
    }[],
    curClass: string | undefined,
  ): JSX.Element[] => {
    const items = elements.map((el, index) => (
      <NavLink
        className={({ isActive }) => clsx(curClass, { [classes.active || '']: isActive })}
        key={index}
        onClick={closeDrawer}
        to={el.to}
      >
        {el.name}
      </NavLink>
    ));

    return items;
  };

  return (
    <Box className={classes.container}>
      <Group h="100%" justify="space-between">
        <Logo />

        <Group gap={0} h="100px" visibleFrom="sm">
          {getItems(nav, classes.link)}
        </Group>

        <Group visibleFrom="sm">{getItems(auth, classes.authLink)}</Group>

        <Burger hiddenFrom="sm" onClick={toggleDrawer} opened={drawerOpened} />
      </Group>

      <Drawer
        className={classes.drawer}
        hiddenFrom="sm"
        onClose={closeDrawer}
        opened={drawerOpened}
        padding="md"
        size="100%"
        title={<Logo />}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(100)})`} mx="-md">
          {getItems(nav, classes.link)}

          <Divider my="sm" />

          <Group grow justify="center" pb="xl" px="md">
            {getItems(auth, classes.authLink)}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export { Header };
