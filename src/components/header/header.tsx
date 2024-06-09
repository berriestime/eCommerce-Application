import type { FC, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  Box,
  Burger,
  // Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  UnstyledButton,
  rem,
  // useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';

import type { RootState } from '@/store/store';

import { CartIcon, LogoutIcon, ProfileIcon } from '@/components/icons';
import { Logo } from '@/components/logo';
import { LogoutModal } from '@/components/modals/logout-modal';
import { setAuthState } from '@/features/auth/authSlice';
import { logoutUser } from '@/features/auth/logout-user';
import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { APP_ROUTE } from '@/routes/routes';

import classes from './header.module.css';

const Header: FC = () => {
  // const { setColorScheme } = useMantineColorScheme();

  const authData = useSelector((state: RootState) => state.auth.authState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = authData === 'AUTHENTICATED';

  const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false);
  const [modalOpened, { close: closeModal, open: openModal }] = useDisclosure(false);
  const nav = [
    { name: 'Main', to: APP_ROUTE.Main },
    { name: 'Store', to: `/${APP_ROUTE.Store}` },
    { name: 'Our Team', to: `/${APP_ROUTE.Team}` },
  ];

  const auth = [
    { icon: <CartIcon size={28} />, isIcon: true, name: 'Cart', to: `/${APP_ROUTE.Cart}` },
    { name: 'Log In', to: `/${APP_ROUTE.Login}` },
    { name: 'Sign Up', to: `/${APP_ROUTE.Registration}` },
  ];

  const profile = [
    { icon: <CartIcon size={28} />, isIcon: true, name: 'Cart', to: `/${APP_ROUTE.Cart}` },
    { icon: <ProfileIcon size={28} />, name: 'Profile', to: `/${APP_ROUTE.Profile}` },
    { icon: <LogoutIcon size={26} />, isIcon: true, name: 'Logout' },
  ];

  const matches = useMediaQuery('(width < 48em)');

  const getItems = (
    elements: {
      icon?: ReactElement;
      isIcon?: boolean;
      name: string;
      to?: string;
    }[],
    curClass?: string,
  ): JSX.Element[] => {
    const items = elements.map((el) => {
      if (!el.to) {
        return (
          <UnstyledButton className={clsx(curClass)} key={el.name} onClick={() => (closeDrawer(), openModal())}>
            {el.icon} {matches ? el.name : ''}
          </UnstyledButton>
        );
      }

      const linkContents = el.isIcon ? (
        <>
          {el.icon} {matches ? el.name : ''}
        </>
      ) : el.icon && !el.isIcon ? (
        <>
          {el.icon} {el.name}
        </>
      ) : (
        <>{el.name}</>
      );

      return (
        <NavLink
          className={({ isActive }) => clsx(curClass, { [classes.active || '']: isActive })}
          key={el.name}
          onClick={closeDrawer}
          to={el.to}
        >
          {linkContents}
        </NavLink>
      );
    });

    return items;
  };

  return (
    <Box bg="customBg" className={classes.container}>
      <Group h="100%" justify="space-between">
        <Logo />

        <Group gap={0} h="100px" visibleFrom="sm">
          {getItems(nav, classes.link)}
        </Group>

        <Group visibleFrom="sm">
          {isAuth ? getItems(profile, classes.profileLink) : getItems(auth, classes.authLink)}{' '}
          {/* <Button lightHidden onClick={() => setColorScheme('light')}>
            Light
          </Button>
          <Button darkHidden onClick={() => setColorScheme('dark')}>
            Dark
          </Button> */}
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

          <Flex align="center" direction="column" gap={24} justify="center" mt={24} pb="xl">
            {isAuth ? getItems(profile, classes.profileLink) : getItems(auth, classes.authLink)}
          </Flex>
        </ScrollArea>
      </Drawer>

      <LogoutModal
        close={closeModal}
        opened={modalOpened}
        submit={() => {
          logoutUser({ apiRootAnonymous, apiRootLogin, apiRootRefresh });
          dispatch(setAuthState('UNAUTHENTICATED'));
          navigate('/');
        }}
      />
    </Box>
  );
};

export { Header };
