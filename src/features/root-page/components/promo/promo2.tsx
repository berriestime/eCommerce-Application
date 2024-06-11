import { useRef } from 'react';

import { Carousel } from '@mantine/carousel';
import { Box, Flex, Overlay, Text, Title, rem } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

import { PROMO_1, PROMO_2, PROMO_3 } from '@/constants/catalog-constants';

import classes from './promo.module.css';

const Promo2 = (): JSX.Element => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const mockdata = [{ ...PROMO_2 }, { ...PROMO_3 }, { ...PROMO_1 }];

  const cards = mockdata.map((card) => (
    <Box h={{ base: 300, sm: 200 }} key={card.id}>
      <Flex
        align="center"
        className={classes.text}
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 24, sm: 64 }}
        justify="center"
        p="xl"
        pos="relative"
      >
        <Title c="bright" className={classes.title} fw={300} fz={{ base: 28, sm: 60 }} order={3}>
          {card.title}
        </Title>
        <Box>
          <Text c="bright" fz={{ base: 16, sm: 20 }} size="lg" ta="center">
            {card.text}
          </Text>
          <Text
            className={classes.title}
            fw={600}
            fz={{ base: 28, sm: 36 }}
            mt={{ base: 20, sm: 0 }}
            size="lg"
            ta="center"
          >
            {card.promocode}
          </Text>
        </Box>
      </Flex>
      <Overlay backgroundOpacity={0.1} color="#000000" />
    </Box>
  ));

  const slides = cards.map((item, i) => <Carousel.Slide key={i}>{item}</Carousel.Slide>);

  return (
    <Box>
      <Carousel
        align="start"
        loop
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        plugins={[autoplay.current]}
        slideGap={{ base: rem(2) }}
        slideSize={{ base: '100%' }}
        slidesToScroll={1}
        withControls={false}
        withIndicators
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export { Promo2 };
