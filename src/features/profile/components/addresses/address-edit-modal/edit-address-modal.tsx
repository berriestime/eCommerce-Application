import { useState } from 'react';

import { Button, Checkbox, Group, LoadingOverlay, Modal, SimpleGrid } from '@mantine/core';

import type { AddressEditModalProps } from '@/features/profile/types/edit-modal-props';
import type { UserAddress } from '@/features/profile/types/user-address';

import { BaseButton } from '@/components/base-button';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { COUNTRIES } from '@/constants/countries';
import { addNotification } from '@/utils/show-notification';

import {
  postChangeAddress,
  postDefaultBillingAddress,
  postDefaultShippingAddress,
  postRemoveDefaultBillingAddress,
  postRemoveDefaultShippingAddress,
} from '../../../api/address-api';

import classes from '@/components/modals/modal.module.css';

const EditAddressModal = ({
  addresses,
  close,
  editAddress,
  form,
  opened,
  setAddresses,
  setBilling,
  setShipping,
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

        if (address.defaultBillingAddress && !editAddress.defaultBillingAddress) {
          await postDefaultBillingAddress(id);
          setBilling(id);
        }
        if (!address.defaultBillingAddress && editAddress.defaultBillingAddress) {
          await postRemoveDefaultBillingAddress();
          setBilling(null);
        }

        if (address.defaultShippingAddress && !editAddress.defaultShippingAddress) {
          await postDefaultShippingAddress(id);
          setShipping(id);
        }
        if (!address.defaultShippingAddress && editAddress.defaultShippingAddress) {
          await postRemoveDefaultShippingAddress();
          setShipping(null);
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
      .then(() =>
        addNotification({ message: 'Address was successfully changed', title: 'Address change', type: 'success' }),
      )
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
            Edit address
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
                Edit
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
