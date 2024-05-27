import { ReactElement, useState } from 'react';

import { Customer } from '@commercetools/platform-sdk';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';

import { BaseButton } from '@/components/base-button';
import { CustomDateInput } from '@/components/custom-date-input';

import { postUserDateOfBirth } from '../../api/user-api';

const BUTTON_TEXT_EDIT = 'Edit';
const BUTTON_TEXT_SAVE = 'Save';

const ProfileDateOfBirth = (user: Customer): ReactElement => {
  const date = dayjs(user.dateOfBirth).format();

  const form = useForm({
    initialValues: {
      dateOfBirth: new Date(date),
    },
    mode: 'uncontrolled',

    validate: {
      dateOfBirth: (value) => {
        if (!value) {
          return 'Required field';
        }
        return dayjs(value).isAfter(dayjs().subtract(18, 'years')) ? 'Must be at least 18 years old' : null;
      },
    },
    validateInputOnChange: true,
  });

  const [buttonState, setButtonState] = useState(BUTTON_TEXT_EDIT);
  const [inputState, setInputState] = useState(true);

  const handleClick = (dateOfBirth: Date): void => {
    const date = dayjs(dateOfBirth).format('YYYY-MM-DD');

    if (buttonState === BUTTON_TEXT_EDIT) {
      setButtonState(BUTTON_TEXT_SAVE);
      setInputState(false);
    } else {
      setButtonState(BUTTON_TEXT_EDIT);
      setInputState(true);
      postUserDateOfBirth(date).catch(console.error);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((user) => {
        //TODO add close date picker here
        handleClick(user.dateOfBirth);
      })}
    >
      <CustomDateInput disabled={inputState} label="Birthday" {...form.getInputProps('dateOfBirth')} />
      <BaseButton type="submit">{buttonState}</BaseButton>
    </form>
  );
};

export { ProfileDateOfBirth };
