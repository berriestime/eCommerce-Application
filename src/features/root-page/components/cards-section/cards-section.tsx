import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from '@mantine/carousel';
import { Box, SimpleGrid, Text, rem } from '@mantine/core';
import { clsx } from 'clsx';
import Autoplay from 'embla-carousel-autoplay';

import { type CardData, SimpleCard } from '@/components/product-card/simple-card';

import classes from './cards-section.module.css';

type Info = {
  mockdata: CardData[];
  text?: string;
  title: string;
};

const CardsSection = (props: Info): JSX.Element => {
  const { mockdata, text, title } = props;
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const productCards = mockdata.map((productCard) => (
    <Link className={classes.link} key={productCard.title} to={productCard.to}>
      <SimpleCard {...productCard} />
    </Link>
  ));

  const slides = productCards.map((item, i) => <Carousel.Slide key={i}>{item}</Carousel.Slide>);

  return (
    <Box className={classes.container}>
      <h3 className={clsx(classes.title, classes.infoContent, { [classes.textPadding || '']: !text })}>{title}</h3>
      <Text c="bright" className={clsx(classes.text, classes.infoContent, { [classes.textPadding || '']: text })}>
        {text}
      </Text>

      <SimpleGrid className={classes.cardsGap} cols={3} mt="md" visibleFrom="md">
        {productCards}
      </SimpleGrid>

      <Carousel
        align="start"
        classNames={{
          controls: classes.carouselControls,
          indicator: classes.carouselIndicator,
          indicators: classes.carouselIndicators,
          root: classes.carousel,
        }}
        hiddenFrom="md"
        loop
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        plugins={[autoplay.current]}
        slideGap={{ base: rem(2) }}
        slideSize={{ base: '100%' }}
        slidesToScroll={1}
        withIndicators
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export { CardsSection };
