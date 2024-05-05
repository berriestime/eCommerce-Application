import type { FC } from 'react';

import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Logo } from '@/components/logo/logo';

import classes from './HeaderMegaMenu.module.css';
// import s from './header.module.css';

// const HeaderOld: FC = () => {
//   return <header className={s.header}>Header</header>;
// };

const Header: FC = () => {
  const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] = useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group h="100%" justify="space-between">
          <Logo />

          <Group gap={0} h="100%" visibleFrom="sm">
            <a className={classes.link} href="/">
              Home
            </a>
            <HoverCard position="bottom" radius="md" shadow="md" width={600} withinPortal>
              <HoverCard.Target>
                <a className={classes.link} href="/">
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor fz="xs" href="#">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                {/* <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid> */}

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text c="dimmed" size="xs">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a className={classes.link} href="/">
              Learn
            </a>
            <a className={classes.link} href="/">
              Academy
            </a>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

          <Burger hiddenFrom="sm" onClick={toggleDrawer} opened={drawerOpened} />
        </Group>
      </header>

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

          <a className={classes.link} href="/">
            Home
          </a>
          {/* <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
            </Center>
          </UnstyledButton> */}

          <a className={classes.link} href="/">
            Learn
          </a>
          <a className={classes.link} href="/">
            Academy
          </a>

          <Divider my="sm" />

          <Group grow justify="center" pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export { Header };
