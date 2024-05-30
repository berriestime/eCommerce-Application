import { ReactElement, useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { useForm } from '@mantine/form';

import { BaseButton } from '@/components/base-button';
import { CustomTextInput } from '@/components/custom-text-input';

import { postUserFirstName } from '../../api/user-api';

const BUTTON_TEXT_EDIT = 'Edit';
const BUTTON_TEXT_SAVE = 'Save';

const ProfileFirstName = (user: Customer): ReactElement => {
  const firstName = user.firstName ? user.firstName : '';

  const form = useForm({
    initialValues: {
      firstName,
    },
    mode: 'uncontrolled',

    validate: {
      firstName: (value) => (/^[A-Za-zäöüßÄÖÜА-Яа-я]+$/.test(value) ? null : 'Invalid name'),
    },
    validateInputOnChange: true,
  });

  const [buttonState, setButtonState] = useState(BUTTON_TEXT_EDIT);
  const [inputState, setInputState] = useState(true);

  const handleClick = (firstName: string): void => {
    if (buttonState === BUTTON_TEXT_EDIT) {
      setButtonState(BUTTON_TEXT_SAVE);
      setInputState(false);
    } else {
      setButtonState(BUTTON_TEXT_EDIT);
      setInputState(true);
      postUserFirstName(firstName).catch(console.error);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((user) => {
        handleClick(user.firstName);
      })}
    >
      <CustomTextInput disabled={inputState} label="First Name" {...form.getInputProps('firstName')} />
      <BaseButton type="submit">{buttonState}</BaseButton>
    </form>
  );
};

export { ProfileFirstName };
