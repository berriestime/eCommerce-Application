import { useState } from 'react';

import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { Modal } from '@mantine/core';

type ModalProps = {
  close: () => void;
  opened: boolean;
};

const BigSlider = ({ close, opened }: ModalProps): JSX.Element => {
  const TRANSITION_DURATION = 200;
  const [emblaBig, setEmblaBig] = useState<Embla | null>(null);
  useAnimationOffsetEffect(emblaBig, TRANSITION_DURATION);

  return (
    <Modal
      onClose={close}
      opened={opened}
      padding={0}
      size="100vw"
      transitionProps={{ duration: TRANSITION_DURATION }}
      withCloseButton={false}
    >
      <Carousel getEmblaApi={setEmblaBig} loop maw="100%">
        <Carousel.Slide>
          <img alt="Cat" src="https://cataas.com/cat" style={{ height: '100vh', objectFit: 'cover', width: 'auto' }} />
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            alt="Cat"
            src="https://cataas.com/cat/cute"
            style={{ height: '100vh', objectFit: 'cover', width: 'auto' }}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            alt="Cat"
            src="https://cataas.com/cat/angry"
            style={{ height: '100vh', objectFit: 'cover', width: 'auto' }}
          />
        </Carousel.Slide>
      </Carousel>
    </Modal>
  );
};

export { BigSlider };
