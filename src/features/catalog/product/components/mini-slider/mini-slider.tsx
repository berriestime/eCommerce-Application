import type { ProductProjection } from '@commercetools/platform-sdk';
import type { Embla } from '@mantine/carousel';

import { useEffect, useMemo, useState } from 'react';

import { Carousel } from '@mantine/carousel';
import { Box, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { BREAKPOINT } from '@/constants/media-query';

import classes from './mini-slider.module.css';

type MiniSliderProps = {
  data: ProductProjection;
  onImageChange: (url: string) => void;
};

const MiniSlider = ({ data, onImageChange }: MiniSliderProps): JSX.Element => {
  const matchesMd = useMediaQuery(`(width < ${BREAKPOINT.MD}) and (width >= ${BREAKPOINT.XS})`);
  const matchesXxs = useMediaQuery(`(width < ${BREAKPOINT.XXS})`);
  const images = useMemo(() => data.masterVariant.images || [], [data]);
  const [embla, setEmbla] = useState<Embla | null>(null);

  const SLIDE_SIZE = 60;
  const MAX_HEIGHT = 220;
  const SPACE = 40;

  useEffect(() => {
    if (images.length === 1) {
      onImageChange(images[0]?.url || '');
      return;
    }

    if (embla) {
      const onSelect = (): void => {
        const index = embla.selectedScrollSnap();
        onImageChange(images[index]?.url || '');
      };
      embla.on('select', onSelect);
      onSelect();
    }
  }, [embla, images, onImageChange]);

  const slides = images.map((image, i) => (
    <Carousel.Slide key={image.url} w={SLIDE_SIZE}>
      <Box w={SLIDE_SIZE}>
        <Image alt={'photo' + i} fit="contain" src={image.url} />
      </Box>
    </Carousel.Slide>
  ));

  return (
    <>
      {images.length > 1 && (
        <Box h="100%" ml={matchesMd || matchesXxs ? SPACE : 0} mt={matchesMd || matchesXxs ? 0 : SPACE}>
          <Carousel
            align="start"
            classNames={{
              container: classes.carouselContainer,
              control: classes.carouselControl,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
              indicators: classes.carouselIndicators,
              root: classes.carousel,
            }}
            getEmblaApi={setEmbla}
            height={matchesMd || matchesXxs ? SLIDE_SIZE : MAX_HEIGHT}
            orientation={matchesMd || matchesXxs ? 'horizontal' : 'vertical'}
            slideGap={{ base: 0 }}
            slideSize={SLIDE_SIZE}
            slidesToScroll={1}
            w={matchesMd || matchesXxs ? `calc(100% - ${SPACE}px)` : SLIDE_SIZE}
          >
            {slides}
          </Carousel>
        </Box>
      )}
    </>
  );
};

export { MiniSlider };
