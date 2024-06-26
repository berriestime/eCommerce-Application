import type { Address } from '@commercetools/platform-sdk';

import { useState } from 'react';

import { Button, Checkbox, Group, LoadingOverlay, Modal, SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';

import type { UserAddress } from '@/features/profile/types/user-address';

import { BaseButton } from '@/components/base-button';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { COUNTRIES } from '@/constants/countries';
import { type AddressAddModalProps } from '@/features/profile/types/add-modal-props';
import { addNotification } from '@/utils/show-notification';
import { isProperCountry } from '@/utils/validate/is-proper-country';
import { isProperPostcode } from '@/utils/validate/is-proper-postcode';
import { notEmpty } from '@/utils/validate/not-empty';
import { onlyLetters } from '@/utils/validate/only-letters';
import { transformCountryIntoCountryCode } from '@/utils/validate/transform-country';

import { postAddUserAddress, postDefaultBillingAddress, postDefaultShippingAddress } from '../../../api/address-api';

import classes from '@/components/modals/modal.module.css';

const AddAddressModal = ({
  addresses,
  close,
  opened,
  setAddresses,
  setBilling,
  setShipping,
}: AddressAddModalProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const toggle = (): void => {
    setVisible((prev) => !prev);
  };

  const form = useForm({
    initialValues: {
      city: '',
      country: '',
      defaultBillingAddress: false,
      defaultShippingAddress: false,
      id: '',
      postalCode: '',
      streetName: '',
    },
    mode: 'uncontrolled',
    transformValues: (values) => {
      return {
        ...values,
        country: transformCountryIntoCountryCode(values.country),
      };
    },
    validate: {
      city: onlyLetters('Only letters'),
      country: isProperCountry,
      postalCode: isProperPostcode('country'),
      streetName: notEmpty,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = (address: UserAddress): void => {
    toggle();
    postAddUserAddress(address)
      .then(async (response) => {
        form.reset();
        form.clearErrors();
        close();

        const isId = response.body.addresses.at(-1)?.id;
        const id = isId ? isId : '';
        const addressWithId = { ...address };
        addressWithId.id = id;

        if (address.defaultBillingAddress) {
          await postDefaultBillingAddress(id);
          setBilling(id);
        }

        if (address.defaultShippingAddress) {
          await postDefaultShippingAddress(id);
          setShipping(id);
        }

        const newAddresses: Address[] = [...addresses, addressWithId];
        setAddresses(newAddresses);
      })
      .then(() =>
        addNotification({ message: 'Address was successfully added', title: 'Address added', type: 'success' }),
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
            Add address
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body c="bright" className={classes.body}>
          <form
            onSubmit={form.onSubmit((address) => {
              handleSubmit(address);
            })}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <CustomTextInput label="Street" mt={10} withAsterisk {...form.getInputProps('streetName')} />
              <CustomTextInput label="City" mt={10} withAsterisk {...form.getInputProps('city')} />
              <CustomSelect label="Country" withAsterisk {...form.getInputProps('country')} data={COUNTRIES} />
              <CustomTextInput label="PostalCode" withAsterisk {...form.getInputProps('postalCode')} />
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

export { AddAddressModal };
