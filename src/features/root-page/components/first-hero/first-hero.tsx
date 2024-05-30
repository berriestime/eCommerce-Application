import { Link } from 'react-router-dom';

import { Container, Title } from '@mantine/core';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { APP_ROUTE } from '@/routes/routes';

import { Hero } from '../hero/hero';

import classes from './first-hero.module.css';
import btnClasses from '@/components/base-button/base-button.module.css';

const FirstHero = (): JSX.Element => {
  return (
    <Hero>
      <Container className={clsx(classes.container, classes.firstHero)} size="md">
        <Title className={classes.title}>
          Timeless Classic <br /> Lava Lamp
        </Title>

        <Link className={classes.control} to={`/${APP_ROUTE.Store}`}>
          <BaseButton className={btnClasses.controlWhite} mt="xl" size="md">
            Shop Now
          </BaseButton>
        </Link>
      </Container>
    </Hero>
  );
};

export { FirstHero };
