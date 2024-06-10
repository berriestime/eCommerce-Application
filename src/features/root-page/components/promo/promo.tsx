import { useRef } from 'react';

import { Carousel } from '@mantine/carousel';
import { BackgroundImage, Box, Flex, Overlay, Text, Title, rem } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';

import promo1 from '../../assets/promo/1.webp';
import promo2 from '../../assets/promo/2.webp';
import promo3 from '../../assets/promo/3.webp';

import classes from './promo.module.css';

const Promo = (): JSX.Element => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const mockdata = [
    { id: 1, promocode: 'FIRST', text: ' on your first purchase with the promo code', title: '-10%', url: promo1 },
    { id: 2, promocode: 'NEO', text: 'on Neo desk lamps with the promo code', title: '-15%', url: promo2 },
    {
      id: 3,
      promocode: 'BIGSAVE3000',
      text: 'on purchases over $3000 with the promo code',
      title: '-20%',
      url: promo3,
    },
  ];

  const cards = mockdata.map((card) => (
    <Box key={card.id}>
      <BackgroundImage h={{ base: 300, sm: 200 }} radius={0} src={card.url}>
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
      </BackgroundImage>
      <Overlay backgroundOpacity={0.7} color="#000000" />
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

export { Promo };
