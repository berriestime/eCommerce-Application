import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppShell, Box, Button, SimpleGrid, Text, Title } from '@mantine/core';
import { useHover, useViewportSize } from '@mantine/hooks';

import { Footer } from '../footer';
import { Header } from '../header';

import classes from './error-page.module.css';

const NotFoundPage: FC = () => {
  const { width } = useViewportSize();
  const { hovered, ref } = useHover();
  const navigate = useNavigate();
  const goBack = (): void => navigate(-1);

  return (
    <AppShell
      footer={{ height: width > 767 ? 100 : 200 }}
      header={{ height: width > 767 ? 100 : 64 }}
      withBorder={false}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main className={classes.main}>
        <Box className={classes.container}>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 40, sm: 80 }}>
            <div className={classes.error}></div>

            <div className={classes.text}>
              <Title className={classes.title}>Something is not right...</Title>
              <Text c="dimmed" size="lg">
                Page you are trying to open does not exist. You may have mistyped the address, or the page has been
                moved to another URL.
              </Text>
              <div ref={ref}>
                <Button
                  className={classes.control}
                  gradient={{ deg: 46, from: 'red', to: 'yellow' }}
                  mt="xl"
                  onClick={goBack}
                  radius="xl"
                  size="md"
                  variant={hovered ? 'gradient' : 'outline'}
                >
                  Go back
                </Button>
              </div>
            </div>
          </SimpleGrid>
        </Box>
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export { NotFoundPage };
