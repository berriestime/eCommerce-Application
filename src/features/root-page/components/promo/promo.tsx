import { useRef } from 'react';

import { Carousel } from '@mantine/carousel';
import { BackgroundImage, Box, Flex, Overlay, Text, Title, rem } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

import { PROMO_1, PROMO_2, PROMO_3 } from '@/constants/catalog-constants';

import promo1 from '../../assets/promo/1.webp';
import promo2 from '../../assets/promo/2.webp';
import promo3 from '../../assets/promo/3.webp';

import classes from './promo.module.css';

const Promo = (): JSX.Element => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const mockdata = [
    { ...PROMO_1, url: promo1 },
    { ...PROMO_2, url: promo2 },
    { ...PROMO_3, url: promo3 },
  ];

  const cards = mockdata.map((card) => (
    <Box key={card.id} mb={40}>
      <BackgroundImage h={{ base: 300, sm: 200 }} radius={0} src={card.url}>
        <Overlay backgroundOpacity={0.3} color="#000000" />
      </BackgroundImage>
      <Flex
        align="center"
        className={classes.text}
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 24, sm: 64 }}
        justify="center"
        p="xl"
        pos="relative"
      >
        <Title c="bright" fw={300} fz={{ base: 28, sm: 60 }} order={3}>
          {card.title}
        </Title>
        <Box>
          <Text c="white" fz={{ base: 16, sm: 20 }} size="lg" ta="center">
            {card.text}
          </Text>
          <Text c="white" fw={300} fz={{ base: 28, sm: 36 }} mt={{ base: 20, sm: 0 }} size="lg" ta="center">
            {card.promocode}
          </Text>
        </Box>
      </Flex>
    </Box>
  ));

  const slides = cards.map((item, i) => <Carousel.Slide key={i}>{item}</Carousel.Slide>);

  return (
    <Box mt={80}>
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

export { Promo };
