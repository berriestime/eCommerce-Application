import type { ReactNode } from 'react';

import { Box, Overlay } from '@mantine/core';

import classes from './hero.module.css';

type HeroProps = {
  children: ReactNode;
};

const Hero = (props: HeroProps): JSX.Element => {
  const { children } = props;

  return (
    <Box className={classes.hero}>
      <Overlay opacity={0.5} zIndex={0} />
      {children}
    </Box>
  );
};

export { Hero };
