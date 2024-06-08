import { useState } from 'react';

import { Group, LoadingOverlay, Modal } from '@mantine/core';

import { BaseButton } from '@/components/base-button';

import classes from '@/components/modals/modal.module.css';

type ModalProps = {
  close: () => void;
  opened: boolean;
  submit: () => void;
  text: string;
  title: string;
};

const OrderModal = ({ close, opened, submit, text, title }: ModalProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const toggle = (): void => {
    setVisible((prev) => !prev);
  };

  return (
    <Modal.Root centered onClose={close} opened={opened}>
      <Modal.Overlay />

      <Modal.Content>
        <LoadingOverlay loaderProps={{ type: 'oval' }} visible={visible} zIndex="2000" />
        <Modal.Header className={classes.header}>
          <Modal.Title c="bright" className={classes.title}>
            {title}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body c="bright" className={classes.body} mt={20}>
          {text}
          <Group grow justify="center" mt={40}>
            <BaseButton
              c="bright"
              onClick={() => {
                toggle();
                submit();
                toggle();
                close();
              }}
            >
              Ok
            </BaseButton>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export { OrderModal };
