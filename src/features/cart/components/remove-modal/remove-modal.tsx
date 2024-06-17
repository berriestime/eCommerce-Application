import { useState } from 'react';

import { Button, Group, LoadingOverlay, Modal } from '@mantine/core';

import { BaseButton } from '@/components/base-button';

import classes from '@/components/modals/modal.module.css';

type ClearCartModalProps = {
  close: () => void;
  opened: boolean;
  submit: () => Promise<void>;
  text: string;
  title: string;
};

const RemoveModal = ({ close, opened, submit, text, title }: ClearCartModalProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const handleConfirmClick = (): void => {
    setVisible(true);
    submit()
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setVisible(false);
        close();
      });
  };

  return (
    <Modal.Root centered onClose={close} opened={opened}>
      <Modal.Overlay />

      <Modal.Content>
        <LoadingOverlay loaderProps={{ type: 'oval' }} visible={visible} zIndex={2000} />
        <Modal.Header className={classes.header}>
          <Modal.Title c="bright" className={classes.title}>
            {title}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body c="bright" className={classes.body} mt={20}>
          {text}
          <Group grow justify="center" mt={40}>
            <BaseButton c="bright" onClick={handleConfirmClick}>
              Ok
            </BaseButton>
            <Button onClick={close} radius="xs" variant="default">
              Cancel
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export { RemoveModal };
