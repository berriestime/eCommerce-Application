import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Container, Overlay, Title } from '@mantine/core';

import { BaseButton } from '@/components/base-button';

import classes from './hero.module.css';

const Hero: FC = () => {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          Timeless Classic <br /> Lava Lamp
        </Title>

        <Link className={classes.control} to="/catalog">
          <BaseButton mt="xl">Shop Now</BaseButton>
        </Link>
      </Container>
    </div>
  );
};

export { Hero };
