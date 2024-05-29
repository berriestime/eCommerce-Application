import { useEffect, useMemo, useState } from 'react';

import { Product } from '@commercetools/platform-sdk';
import { Carousel, Embla } from '@mantine/carousel';
import { Box, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import classes from './mini-slider.module.css';

type MiniSliderProps = {
  data: Product;
  onImageChange: (url: string) => void;
};

const MiniSlider = ({ data, onImageChange }: MiniSliderProps): JSX.Element => {
  const matchesMd = useMediaQuery('(width < 62em) and (width >= 36em)');
  const matchesXxs = useMediaQuery('(width < 25em)');
  const images = useMemo(() => data.masterData.current.masterVariant.images || [], [data]);
  const [embla, setEmbla] = useState<Embla | null>(null);

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
    <Carousel.Slide key={image.url} w={60}>
      <Box w={60}>
        <Image alt={'photo' + i} fit="contain" src={image.url} />
      </Box>
    </Carousel.Slide>
  ));

  return (
    <>
      {images.length > 1 && (
        <Box h="100%" ml={matchesMd || matchesXxs ? 40 : 0} mt={matchesMd || matchesXxs ? 0 : 40}>
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
            height={matchesMd || matchesXxs ? 60 : 220}
            orientation={matchesMd || matchesXxs ? 'horizontal' : 'vertical'}
            slideGap={{ base: 0 }}
            slideSize={60}
            slidesToScroll={1}
            w={matchesMd || matchesXxs ? 'calc(100% - 40px)' : 60}
          >
            {slides}
          </Carousel>
        </Box>
      )}
    </>
  );
};

export { MiniSlider };
