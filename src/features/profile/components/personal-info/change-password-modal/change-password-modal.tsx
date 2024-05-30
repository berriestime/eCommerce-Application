import { useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { Button, Flex, Group, LoadingOverlay, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';

import { BaseButton } from '@/components/base-button';
import { CustomPasswordInput } from '@/components/custom-password-input';
import { postChangePassword } from '@/features/profile/api/change-password';
import { validatePassword } from '@/utils';
import { addNotification } from '@/utils/show-notification';
import { matchesPassword } from '@/utils/validate/match-password';

import classes from '@/components/modals/modal.module.css';

type ChangePasswordModalProps = {
  close: () => void;
  opened: boolean;
  user: Customer;
};

const ChangePasswordModal = ({ close, opened, user }: ChangePasswordModalProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const toggle = (): void => {
    setVisible((prev) => !prev);
  };

  const form = useForm({
    initialValues: {
      confirmPassword: '',
      currentPassword: '',
      password: '',
    },
    mode: 'uncontrolled',
    validate: {
      confirmPassword: matchesPassword,
      password: (value) => validatePassword(value),
    },
    validateInputOnChange: true,
  });

  const handleSubmit = (id: string, currentPassword: string, newPassword: string, email: string): void => {
    toggle();
    postChangePassword(id, currentPassword, newPassword, email)
      .then(() => {
        form.reset();
        form.clearErrors();
        close();
      })
      .catch((error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
        addNotification({ message: errorMessage, title: 'Error', type: 'error' });
      })
      .finally(() => {
        toggle();
      });
  };

  return (
    <Modal.Root
      centered
      onClose={() => {
        close();
        form.reset();
        form.clearErrors();
      }}
      opened={opened}
    >
      <Modal.Overlay />

      <Modal.Content>
        <LoadingOverlay loaderProps={{ type: 'oval' }} visible={visible} zIndex="2000" />
        <Modal.Header className={classes.header}>
          <Modal.Title c="bright" className={classes.title}>
            Change password
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body c="bright" className={classes.body}>
          <form
            onSubmit={form.onSubmit((values) => {
              handleSubmit(user.id, values.currentPassword, values.password, user.email);
            })}
          >
            <Flex direction={'column'}>
              <CustomPasswordInput
                label="Current Password"
                mt={10}
                withAsterisk
                {...form.getInputProps('currentPassword')}
              />
              <CustomPasswordInput label="New Password" mt={10} withAsterisk {...form.getInputProps('password')} />
              <CustomPasswordInput
                label="Confirm New Password"
                mt={10}
                withAsterisk
                {...form.getInputProps('confirmPassword')}
              />
            </Flex>
            <Group grow justify="center" mt="xl">
              <BaseButton c="bright" type="submit">
                Change
              </BaseButton>
              <Button
                onClick={() => {
                  close();
                  form.reset();
                  form.clearErrors();
                }}
                radius="xs"
                variant="default"
              >
                Cancel
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export { ChangePasswordModal };
