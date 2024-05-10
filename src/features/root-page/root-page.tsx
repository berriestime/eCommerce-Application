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
import { CategoriesSection } from './components/categories-section';
import { FirstHero } from './components/first-hero';
import { SecondHero } from './components/second-hero';

const bestData = [
  { image: imgBestGreen, price: '£46.00', title: 'Fireflow candle lava lamp: Copper', to: '/catalog' },
  {
    discount: '25%',
    image: imgBestBlue,
    price: '£85.00',
    title: 'Neo lava lamp for children & all ages: Copper',
    to: '/catalog',
  },
  { discount: '15%', image: imgBestYellow, price: '£48.00', title: 'Pod candle lava lamp: Copper', to: '/catalog' },
];

const classicData = [
  { image: imgAstroBlue, price: '£95.00', title: 'Astro Platinum Vinyl lava lamp', to: '/catalog' },
  { image: imgAstroYellow, price: '£95.00', title: 'Astro Vinyl lava lamp', to: '/catalog' },
  { image: imgAstroRed, price: '£87.00', title: 'Astro the original lava lamp: Silver', to: '/catalog' },
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
      <CategoriesSection />
      <Footer />
    </Box>
  );
};

export { RootPage };
