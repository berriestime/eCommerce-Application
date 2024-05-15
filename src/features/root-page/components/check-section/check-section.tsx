import { NavLink } from 'react-router-dom';

import { Container, SimpleGrid, Text } from '@mantine/core';
import { clsx } from 'clsx';

import { Hero } from '../hero/hero';

import classesHero from '../hero/hero.module.css';
import classes from './ActionsGrid.module.css';
import classesHeader from '@/components/header/header.module.css';

const mockdata = [
  { title: 'Main', to: '/' },
  { title: 'Store', to: '/catalog' },
  { title: 'Cart', to: '/cart' },
  { title: 'Log in', to: '/login' },
  { title: 'Sign up', to: '/registration' },
  { title: 'Profile', to: '/dashboard' },
  { title: 'Our Team', to: '/team' },
];

const CheckSection = (): JSX.Element => {
  const items = mockdata.map((el) => (
    <NavLink
      className={({ isActive }) => clsx(classesHeader.profileLink, { [classesHeader.active || '']: isActive })}
      key={el.title}
      to={el.to}
    >
      {el.title}
    </NavLink>
  ));

  return (
    <Hero>
      <Container className={clsx(classesHero.container, classesHero.secondHero)} size="md">
        <Text className={classes.title}>All links</Text>

        <SimpleGrid cols={{ base: 2, xs: 3 }} mt="md">
          {items}
        </SimpleGrid>
      </Container>
    </Hero>
  );
};

export { CheckSection };
