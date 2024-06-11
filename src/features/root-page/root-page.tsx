import type { FC } from 'react';

import { Box } from '@mantine/core';

import { Footer } from '@/components/footer';
import { APP_ROUTE } from '@/routes/routes';

import imgAstroRed from './assets/astro/lava_lamp_vioet_red.webp';
import imgAstroBlue from './assets/astro/platinum_vinyl_lava_lamp_blue.webp';
import imgAstroYellow from './assets/astro/vinyl.webp';
import imgBestBlue from './assets/best/blue.webp';
import imgBestGreen from './assets/best/green.webp';
import imgBestYellow from './assets/best/yellow.webp';
import { CardsSection } from './components/cards-section';
import { CategoriesSection } from './components/categories-section';
import { FirstHero } from './components/first-hero';
import { Promo } from './components/promo';
import { Promo2 } from './components/promo/promo2';
import { SecondHero } from './components/second-hero';

const bestData = [
  {
    image: imgBestGreen,
    price: '$46.00',
    title: 'Fireflow candle lava lamp: Copper',
    to: `/${APP_ROUTE.Store}/lamps/candle/fireflow-candle-lava-lamp-cooper-blue-yellow`,
  },
  {
    image: imgBestBlue,
    price: '$85.00',
    title: 'Neo lava lamp for children & all ages: Copper',
    to: `/${APP_ROUTE.Store}/lamps/new/neo-lava-cooper-blue-turquoise`,
  },
  {
    image: imgBestYellow,
    price: '$48.00',
    title: 'Pod candle lava lamp: Copper',
    to: `/${APP_ROUTE.Store}/lamps/candle/pod-candle-lava-lamp-cooper-yellow-orange`,
  },
];

const classicData = [
  {
    image: imgAstroBlue,
    price: '$95.00',
    title: 'Astro Platinum Vinyl lava lamp',
    to: `/${APP_ROUTE.Store}/lamps/1960/astro-original-platinum-violet-turquoise`,
  },
  {
    image: imgAstroYellow,
    price: '$95.00',
    title: 'Astro Vinyl lava lamp',
    to: `/${APP_ROUTE.Store}/lamps/1960/astro-original-black-vinyl-yellow-white`,
  },
  {
    image: imgAstroRed,
    price: '$87.00',
    title: 'Astro the original lava lamp: Silver',
    to: `/${APP_ROUTE.Store}/lamps/1960/astro-original-silver-violet-red`,
  },
];

const RootPage: FC = () => {
  return (
    <Box>
      <FirstHero />
      <CardsSection mockdata={bestData} title="BEST SELLERS" />
      <SecondHero />
      <Promo2 />
      <Box mt={60}></Box>

      <CardsSection
        mockdata={classicData}
        text="The first and original lava lamp is a Pop Design classic. Timeless and time-tested choice."
        title="ASTRO LAVA LAMP"
      />
      <Promo />
      <CategoriesSection />
      <Footer />
    </Box>
  );
};

export { RootPage };
