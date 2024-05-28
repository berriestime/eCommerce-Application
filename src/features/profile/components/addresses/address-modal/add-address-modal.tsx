import { Dispatch, SetStateAction, useState } from 'react';

import { Address } from '@commercetools/platform-sdk';
import { Button, Group, LoadingOverlay, Modal, SimpleGrid } from '@mantine/core';
import { UseFormReturnType, useForm } from '@mantine/form';
import { postcodeValidator } from 'postcode-validator';

import { BaseButton } from '@/components/base-button';
import { CustomSelect } from '@/components/custom-select';
import { CustomTextInput } from '@/components/custom-text-input';
import { addNotification } from '@/utils/show-notification';

import { postAddUserAddress } from '../../../api/address-api';

import classes from '@/components/modals/modal.module.css';

const COUNTRIES = ['United Kingdom', 'Germany', 'United States'];

type AddressModalProps = {
  addresses: Address[];
  close: () => void;
  opened: boolean;
  setAddresses: Dispatch<SetStateAction<Address[]>>;
};

const notEmpty = (value: string): null | string => (value.trim() ? null : 'Required field');

const onlyLetters =
  (message: string) =>
  (value: string): null | string => {
    if (!value) {
      return 'Required field';
    }
    if (!/^[A-Za-zäöüßÄÖÜА-Яа-я]+$/.test(value)) {
      return message;
    }
    return null;
  };

const isProperCountry = (value: string): null | string => (COUNTRIES.includes(value) ? null : 'Invalid country');

const transformCountryIntoCountryCode = (country: string): string => {
  switch (country) {
    case 'Germany':
      return 'DE';
    case 'United Kingdom':
      return 'UK';
    case 'United States':
      return 'US';
    default:
      return '';
  }
};

const isProperPostcode =
  <K extends string, T extends Record<K, string>>(countryField: K) =>
  (value: string, values: UseFormReturnType<T>['values']): null | string => {
    const code = transformCountryIntoCountryCode(values[countryField]);
    if (!code) {
      return 'Invalid country';
    }
    return postcodeValidator(value, code) ? null : 'Invalid postcode';
  };

const AddressModal = ({ addresses, close, opened, setAddresses }: AddressModalProps): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const toggle = (): void => {
    setVisible((prev) => !prev);
  };

  const form = useForm({
    initialValues: {
      city: '',
      country: '',
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
              toggle();
              postAddUserAddress(address)
                .then((response) => {
                  form.reset();
                  form.clearErrors();
                  close();
                  console.log(response.body.addresses.at(-1));
                  const isId = response.body.addresses.at(-1)?.id;
                  const id = isId ? isId : '';
                  const addressWithId = { ...address };
                  addressWithId.id = id;
                  const newAddresses: Address[] = [...addresses, addressWithId];
                  setAddresses(newAddresses);
                })
                .catch((error: unknown) => {
                  const errorMessage = error instanceof Error ? error.message : String(error);
                  addNotification({ message: errorMessage, title: 'Error', type: 'error' });
                })
                .finally(() => {
                  toggle();
                });
            })}
          >
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <CustomTextInput label="Street" mt={10} withAsterisk {...form.getInputProps('streetName')} />
              <CustomTextInput label="City" mt={10} withAsterisk {...form.getInputProps('city')} />
              <CustomSelect label="Country" withAsterisk {...form.getInputProps('country')} data={COUNTRIES} />
              <CustomTextInput label="PostalCode" withAsterisk {...form.getInputProps('postalCode')} />
            </SimpleGrid>
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

export { AddressModal };
