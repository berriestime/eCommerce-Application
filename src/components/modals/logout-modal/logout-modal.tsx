import { Button, Group, Modal } from '@mantine/core';

import { BaseButton } from '@/components/base-button';

import classes from '../modal.module.css';

type LogoutModalProps = {
  close: () => void;
  opened: boolean;
  submit: () => void;
};

const LogoutModal = ({ close, opened, submit }: LogoutModalProps): JSX.Element => {
  return (
    <Modal
      centered
      classNames={{
        body: classes.body,
        header: classes.header,
        title: classes.title,
      }}
      onClose={close}
      opened={opened}
      title="Logout"
    >
      Are you sure you want to log out?
      <Group grow justify="center" mt="xl">
        <BaseButton
          onClick={() => {
            submit();
            close();
          }}
        >
          Ok
        </BaseButton>
        <Button onClick={close} radius="xs" variant="default">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export { LogoutModal };
