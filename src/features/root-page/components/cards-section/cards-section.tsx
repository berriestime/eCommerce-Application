import { Link } from 'react-router-dom';

import { Box, SimpleGrid } from '@mantine/core';
import { clsx } from 'clsx';

import { SimpleCard } from '@/components/simple-card';

import classes from '../../root-page.module.css';

type Info = {
  mockdata: { image: string; price: string; title: string; to: string }[];
  text?: string;
  title: string;
};

const CardsSection = (props: Info): JSX.Element => {
  const { mockdata, text, title } = props;

  const producCards = mockdata.map((producCard) => (
    <Link key={producCard.title} to={producCard.to}>
      <SimpleCard {...producCard} />
    </Link>
  ));

  return (
    <Box className={classes.container}>
      <h3 className={clsx(classes.title, classes.infoContent, { [classes.textPadding || '']: !text })}>{title}</h3>
      <p className={clsx(classes.text, classes.infoContent, { [classes.textPadding || '']: text })}>{text}</p>
      <SimpleGrid cols={3} mt="md">
        {producCards}
      </SimpleGrid>
    </Box>
  );
};

export { CardsSection };
