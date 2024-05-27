import { ReactElement, useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { useForm } from '@mantine/form';

import { BaseButton } from '@/components/base-button';
import { CustomTextInput } from '@/components/custom-text-input';

import { postUserName } from '../../api/user-api';

const ButtonMode = {
  edit: 'Edit',
  save: 'Save',
};

const FirstName = (user: Customer): ReactElement => {
  const name = user.firstName ? user.firstName : '';
  const form = useForm({
    initialValues: {
      firstName: name,
    },
    mode: 'uncontrolled',

    validate: {
      firstName: (value) => (/^[A-Za-zäöüßÄÖÜА-Яа-я]+$/.test(value) ? null : 'Invalid name'),
    },
    validateInputOnChange: true,
  });

  const [buttonState, setButtonState] = useState(ButtonMode.edit);
  const [inputState, setInputState] = useState(true);

  const handleClick = (firstName: string): void => {
    if (buttonState === ButtonMode.edit) {
      setButtonState(ButtonMode.save);
      setInputState(false);
    } else {
      setButtonState(ButtonMode.edit);
      setInputState(true);
      postUserName(firstName).catch(console.error);
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

export { FirstName };
