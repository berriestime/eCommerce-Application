import { useState } from 'react';

import { Button, Checkbox, Group, LoadingOverlay, Modal, SimpleGrid } from '@mantine/core';

import { BaseButton } from '@/components/base-button';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { AddressEditModalProps } from '@/features/profile/types/edit-modal-props';
import { UserAddress } from '@/features/profile/types/user-address';
import { addNotification } from '@/utils/show-notification';

import { postChangeAddress, postDefaultBillingAddress, postDefaultShippingAddress } from '../../../api/address-api';

import classes from '@/components/modals/modal.module.css';

const COUNTRIES = ['United Kingdom', 'Germany', 'United States'];

const EditAddressModal = ({
  addresses,
  close,
  editAddress,
  form,
  opened,
  setAddresses,
}: AddressEditModalProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const toggle = (): void => {
    setVisible((prev) => !prev);
  };

  const handleSubmit = (id: string, address: UserAddress): void => {
    toggle();
    postChangeAddress(id, address)
      .then(async () => {
        form.reset();
        form.clearErrors();
        close();

        if (address.defaultBillingAddress) {
          await postDefaultBillingAddress(id);
        }

        if (address.defaultShippingAddress) {
          await postDefaultShippingAddress(id);
        }

        const index = addresses.findIndex((address) => address.id === id);
        setAddresses(
          addresses.map((addressElement, i) => {
            if (i === index) {
              return (addressElement = address);
            }
            return addressElement;
          }),
        );
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
            Add address
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body c="bright" className={classes.body}>
          <form
            onSubmit={form.onSubmit((address) => {
              const id = editAddress.id ? editAddress.id : '';
              handleSubmit(id, address);
            })}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <CustomTextInput
                label="Street"
                mt={10}
                placeholder={editAddress.streetName}
                withAsterisk
                {...form.getInputProps('streetName')}
              />
              <CustomTextInput
                label="City"
                mt={10}
                placeholder={editAddress.city}
                withAsterisk
                {...form.getInputProps('city')}
              />
              <CustomSelect
                label="Country"
                placeholder={editAddress.country}
                withAsterisk
                {...form.getInputProps('country')}
                data={COUNTRIES}
              />
              <CustomTextInput
                label="PostalCode"
                placeholder={editAddress.postalCode}
                withAsterisk
                {...form.getInputProps('postalCode')}
              />
            </SimpleGrid>
            <Checkbox
              key={form.key('defaultShippingAddress')}
              {...form.getInputProps('defaultShippingAddress', { type: 'checkbox' })}
              color="rgba(243, 231, 228, 1)"
              label="Set as default shipping address"
              my={'sm'}
              variant="outline"
            />
            <Checkbox
              key={form.key('defaultBillingAddress')}
              {...form.getInputProps('defaultBillingAddress', { type: 'checkbox' })}
              color="rgba(243, 231, 228, 1)"
              label="Set as default billing address"
              my={'sm'}
              variant="outline"
            />
            <Group grow justify="center" mt="xl">
              <BaseButton c="bright" type="submit">
                Add
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

export { EditAddressModal };
