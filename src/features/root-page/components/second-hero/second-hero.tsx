import { Link } from 'react-router-dom';

import { Container, Text, Title } from '@mantine/core';
import { clsx } from 'clsx';

import { Hero } from '../hero/hero';

import classes from '../hero/hero.module.css';

const SecondHero = (): JSX.Element => {
  return (
    <Hero>
      <Container className={clsx(classes.container, classes.secondHero)} size="md">
        <Text className={clsx(classes.text, classes.textSize)}>Illuminate</Text>

        <Title className={classes.title}>YOUR SPACE</Title>

        <Link className={classes.link} to="/catalog">
          <Text className={clsx(classes.textSize)}>Buy Lava Lamp</Text>
        </Link>
      </Container>
    </Hero>
  );
};

export { SecondHero };
