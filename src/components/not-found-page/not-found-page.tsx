import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { AppShell, Box, SimpleGrid, Text, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import { BaseButton } from '@/components/base-button';
import { Header } from '@/components/header';

import classes from './error-page.module.css';

const NotFoundPage: FC = () => {
  const { width } = useViewportSize();

  return (
    <AppShell header={{ height: width > 767 ? 100 : 64 }} withBorder={false}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main className={classes.main}>
        <Box className={classes.container}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 40, sm: 80 }}>
            <div className={classes.error}></div>

            <div className={classes.text}>
              <Title c="bright" className={classes.title}>
                Something is not right...
              </Title>
              <Text className={classes.message} size="lg">
                Page you are trying to open was not found. You may have mistyped the address, or the page has been moved
                to another URL.
              </Text>

              <Link className={classes.button} to="/">
                <BaseButton c="bright" fullWidth size="md">
                  Get back to home page
                </BaseButton>
              </Link>
            </div>
          </SimpleGrid>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export { NotFoundPage };
