import type { FC } from 'react';

import { Box } from '@mantine/core';

import { Footer } from '@/components/footer';

import imgAstroRed from './assets/mathmos_astro_original_lava_lamp_vioet_red_main-917x917-c-removebg-preview.png';
import imgAstroBlue from './assets/mathmos_astro_platinum_vinyl_lava_lamp_blue_turquoise_main-917x917-c-removebg-preview.png';
import imgAstroYellow from './assets/mathmos_astro_vinyl_lava_lamp_yellow_orange-removebg-preview.png';
import imgBestBlue from './assets/new/mathmos_neo_copper_lava_lamp_blue_turquoise-removebg-preview.png';
import imgBestYellow from './assets/new/mathmos_pod_candle_lava_lamp_copper_yellow_orange-1-removebg-preview.png';
import imgBestGreen from './assets/new/v2_mathmos_fireflow_candle_lava_lamp_copper_blue_yellow-removebg-preview.png';
import { CardsSection } from './components/cards-section';
import { FirstHero } from './components/first-hero';
import { SecondHero } from './components/second-hero';

// import classes from './root-page.module.css';

const bestData = [
  { image: imgBestGreen, price: '100500$', title: 'ASTRO LAVA LAMP', to: '/catalog' },
  { image: imgBestBlue, price: '100500$', title: 'ASTRO LAVA LAMP2', to: '/catalog' },
  { image: imgBestYellow, price: '100500$', title: 'ASTRO LAVA LAMP3', to: '/catalog' },
];

const classicData = [
  { image: imgAstroBlue, price: '100500$', title: 'ASTRO LAVA LAMP', to: '/catalog' },
  { image: imgAstroYellow, price: '100500$', title: 'ASTRO LAVA LAMP2', to: '/catalog' },
  { image: imgAstroRed, price: '100500$', title: 'ASTRO LAVA LAMP3', to: '/catalog' },
];

const RootPage: FC = () => {
  return (
    <Box>
      <FirstHero />
      <CardsSection mockdata={bestData} title="BEST SELLERS" />
      <SecondHero />
      <CardsSection
        mockdata={classicData}
        text="The first and original lava lamp is a Pop Design classic. Timeless and time-tested choice."
        title="ASTRO LAVA LAMP"
      />
      <Footer />
    </Box>
  );
};

export { RootPage };
