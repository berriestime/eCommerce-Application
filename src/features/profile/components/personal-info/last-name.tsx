import { ReactElement, useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { useForm } from '@mantine/form';

import { BaseButton } from '@/components/base-button';
import { CustomTextInput } from '@/components/custom-text-input';

import { postUserLastName } from '../../api/user-api';

const BUTTON_TEXT_EDIT = 'Edit';
const BUTTON_TEXT_SAVE = 'Save';

const ProfileLastName = (user: Customer): ReactElement => {
  const lastName = user.lastName ? user.lastName : '';

  const form = useForm({
    initialValues: {
      lastName,
    },
    mode: 'uncontrolled',

    validate: {
      lastName: (value) => (/^[A-Za-zäöüßÄÖÜА-Яа-я]+$/.test(value) ? null : 'Invalid name'),
    },
    validateInputOnChange: true,
  });

  const [buttonState, setButtonState] = useState(BUTTON_TEXT_EDIT);
  const [inputState, setInputState] = useState(true);

  const handleClick = (lastName: string): void => {
    if (buttonState === BUTTON_TEXT_EDIT) {
      setButtonState(BUTTON_TEXT_SAVE);
      setInputState(false);
    } else {
      setButtonState(BUTTON_TEXT_EDIT);
      setInputState(true);
      console.log(lastName);
      postUserLastName(lastName).catch(console.error);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((user) => {
        handleClick(user.lastName);
      })}
    >
      <CustomTextInput disabled={inputState} label="Last Name" {...form.getInputProps('lastName')} />
      <BaseButton type="submit">{buttonState}</BaseButton>
    </form>
  );
};

export { ProfileLastName };
