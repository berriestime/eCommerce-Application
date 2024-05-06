import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Burger, Divider, Drawer, Group, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Logo } from '@/components/logo/logo';

import classes from './header.module.css';

const Header: FC = () => {
  const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false);

  return (
    <Box className={classes.container}>
      <Group h="100%" justify="space-between">
        <Logo />

        <Group gap={0} h="100px" visibleFrom="sm">
          <NavLink className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)} to="/">
            Main
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
            to="/catalog"
          >
            Store
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
            to="/cart"
          >
            Cart
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
            to="/team"
          >
            Our Team
          </NavLink>
        </Group>

        <Group visibleFrom="sm">
          <NavLink className={classes.authLink} to="/login">
            Log in
          </NavLink>
          <NavLink className={classes.authLink} to="/team">
            Sign up
          </NavLink>
        </Group>

        <Burger hiddenFrom="sm" onClick={toggleDrawer} opened={drawerOpened} />
      </Group>

      <Drawer
        hiddenFrom="sm"
        onClose={closeDrawer}
        opened={drawerOpened}
        padding="md"
        size="100%"
        title="Navigation"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <NavLink className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)} to="/">
            Main
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
            to="/catalog"
          >
            Store
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
            to="/cart"
          >
            Cart
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `${classes.link} ${classes.active}` : classes.link)}
            to="/team"
          >
            Our Team
          </NavLink>

          <Divider my="sm" />

          <Group grow justify="center" pb="xl" px="md">
            <NavLink className={classes.link} to="/login">
              Log in
            </NavLink>
            <NavLink className={classes.link} to="/team">
              Sign up
            </NavLink>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export { Header };
