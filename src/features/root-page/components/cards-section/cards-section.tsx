import { Link } from 'react-router-dom';

import { Box, SimpleGrid } from '@mantine/core';
import { clsx } from 'clsx';

import { type CardData, SimpleCard } from '@/components/simple-card';

import classes from '../../root-page.module.css';
import cardClasses from '@/components/simple-card/simple-card.module.css';

type Info = {
  mockdata: CardData[];
  text?: string;
  title: string;
};

const CardsSection = (props: Info): JSX.Element => {
  const { mockdata, text, title } = props;

  const producCards = mockdata.map((producCard) => (
    <Link className={cardClasses.link} key={producCard.title} to={producCard.to}>
      <SimpleCard {...producCard} />
    </Link>
  ));

  return (
    <Box className={classes.container}>
      <h3 className={clsx(classes.title, classes.infoContent, { [classes.textPadding || '']: !text })}>{title}</h3>
      <p className={clsx(classes.text, classes.infoContent, { [classes.textPadding || '']: text })}>{text}</p>
      <SimpleGrid className={cardClasses.cardsGap} cols={3} mt="md">
        {producCards}
      </SimpleGrid>
    </Box>
  );
};

export { CardsSection };
