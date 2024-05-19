import { useState } from 'react';

import { Button, Group, LoadingOverlay, Modal } from '@mantine/core';

import { BaseButton } from '@/components/base-button';

import classes from '../modal.module.css';

type LogoutModalProps = {
  close: () => void;
  opened: boolean;
  submit: () => void;
};

const LogoutModal = ({ close, opened, submit }: LogoutModalProps): JSX.Element => {
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
          <Modal.Title className={classes.title}>Logout</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body className={classes.body}>
          Are you sure you want to log out?
          <Group grow justify="center" mt="xl">
            <BaseButton
              onClick={() => {
                toggle();
                submit();
                toggle();
                close();
              }}
            >
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

export { LogoutModal };
