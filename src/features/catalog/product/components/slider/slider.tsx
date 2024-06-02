import type { Embla } from '@mantine/carousel';

import { useEffect, useState } from 'react';

import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel';
import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { BREAKPOINT } from '@/constants/media-query';

import classes from './slider.module.css';

type ModalProps = {
  close: () => void;
  currentImageUrl: string;
  images: { url: string }[];
  opened: boolean;
};

const BigSlider = ({ close, currentImageUrl, images, opened }: ModalProps): JSX.Element => {
  const matches = useMediaQuery(`(width > ${BREAKPOINT.XS_CUSTOM})`);
  const TRANSITION_DURATION = 200;
  const [emblaBig, setEmblaBig] = useState<Embla | null>(null);
  useAnimationOffsetEffect(emblaBig, TRANSITION_DURATION);

  useEffect(() => {
    if (emblaBig && currentImageUrl) {
      const index = images.findIndex((image) => image.url === currentImageUrl);
      if (index !== -1) {
        emblaBig.scrollTo(index);
      }
    }
  }, [emblaBig, currentImageUrl, images]);

  const slides = images.map((image, i) => (
    <Carousel.Slide key={image.url}>
      <img alt={'photo ' + i} src={image.url} style={{ height: '79vh', objectFit: 'contain', width: '100%' }} />
    </Carousel.Slide>
  ));

  return (
    <Modal
      classNames={{
        body: classes.modalBody,
        close: classes.modalClose,
        content: classes.modalContent,
        header: classes.modalHeader,
        inner: classes.modalInner,
      }}
      onClose={close}
      opened={opened}
      padding={0}
      size="100vw"
      transitionProps={{ duration: TRANSITION_DURATION }}
    >
      <Carousel
        align={matches ? 'start' : 'center'}
        classNames={{
          container: classes.carouselContainer,
          control: classes.carouselControl,
          controls: classes.carouselControls,
          indicator: classes.carouselIndicator,
          indicators: classes.carouselIndicators,
          root: classes.carousel,
        }}
        getEmblaApi={setEmblaBig}
        height={matches ? '100%' : '80vh'}
        loop
        maw="100%"
        orientation={matches ? 'horizontal' : 'vertical'}
        slidesToScroll={1}
        withControls={images.length > 1 ? true : false}
        withIndicators={matches ? true : false}
      >
        {slides}
      </Carousel>
    </Modal>
  );
};

export { BigSlider };
