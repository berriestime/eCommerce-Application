import type { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Burger, Button, Divider, Drawer, Group, Modal, ScrollArea, UnstyledButton, rem } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { LogoutIcon } from '@/components/icons/logout';
import { ProfileIcon } from '@/components/icons/profile';
import { Logo } from '@/components/logo';

import classes from './header.module.css';

const Header: FC = () => {
  const isAuth = true;
  const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false);
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
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

  const profile = [
    { icon: <ProfileIcon size={28} />, name: 'Profile', to: '/dashboard' },
    { icon: <LogoutIcon size={26} />, name: 'Logout' },
  ];

  const matches = useMediaQuery('(min-width: 48em)');

  const getItems = (
    elements: {
      icon?: ReactElement;
      name: string;
      to?: string;
    }[],
    curClass: string | undefined,
  ): JSX.Element[] => {
    const items = elements.map((el) =>
      el.to && el.icon === undefined ? (
        <NavLink
          className={({ isActive }) => clsx(curClass, { [classes.active || '']: isActive })}
          key={el.name}
          onClick={closeDrawer}
          to={el.to}
        >
          {el.name}
        </NavLink>
      ) : el.to && el.icon ? (
        <NavLink
          className={({ isActive }) => clsx(curClass, { [classes.active || '']: isActive })}
          key={el.name}
          onClick={closeDrawer}
          to={el.to}
        >
          {el.icon} {el.name}
        </NavLink>
      ) : (
        <UnstyledButton className={clsx(curClass)} key={el.name} onClick={() => (closeDrawer(), openModal())}>
          {el.icon} {!matches ? el.name : ''}
        </UnstyledButton>
      ),
    );

    return items;
  };

  return (
    <Box className={classes.container}>
      <Group h="100%" justify="space-between">
        <Logo />

        <Group gap={0} h="100px" visibleFrom="sm">
          {getItems(nav, classes.link)}
        </Group>

        <Group visibleFrom="sm">
          {isAuth ? getItems(profile, classes.profileLink) : getItems(auth, classes.authLink)}
        </Group>

        <Burger hiddenFrom="sm" onClick={toggleDrawer} opened={drawerOpened} />
      </Group>

      <Drawer
        className={classes.drawer}
        hiddenFrom="sm"
        onClose={closeDrawer}
        opened={drawerOpened}
        padding="md"
        position="right"
        size="100%"
        title={<Logo />}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(100)})`} mx="-md" px="md">
          {getItems(nav, classes.link)}

          <Divider my="sm" />

          <Group grow justify="center" pb="xl">
            {isAuth ? getItems(profile, classes.profileLink) : getItems(auth, classes.authLink)}
          </Group>
        </ScrollArea>
      </Drawer>

      <Modal
        centered
        classNames={{
          body: classes.body,
          header: classes.header,
          title: classes.title,
        }}
        onClose={closeModal}
        opened={modalOpened}
        title="Logout"
      >
        Are you sure you want to log out?
        <Group grow justify="center" mt="xl">
          <BaseButton>Ok</BaseButton>
          <Button onClick={closeModal} radius="xs" variant="default">
            Cancel
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

export { Header };
