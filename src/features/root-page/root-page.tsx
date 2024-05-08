import type { FC } from 'react';

import { Box } from '@mantine/core';

import { Footer } from '@/components/footer';

import { FirstHero } from './components/first-hero';
import { SecondHero } from './components/second-hero';

// import classes from './root-page.module.css';

const RootPage: FC = () => {
  return (
    <Box>
      <FirstHero />
      <Box h="100vh" />
      <SecondHero />
      <Box h="100vh" />
      <Footer />
    </Box>
  );
};

export { RootPage };
