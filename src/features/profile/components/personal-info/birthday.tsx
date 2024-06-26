import type { Customer } from '@commercetools/platform-sdk';

import type { ReactElement } from 'react';
import { useRef, useState } from 'react';

import { useForm } from '@mantine/form';
import { clsx } from 'clsx';
import dayjs from 'dayjs';

import { BaseButton } from '@/components/base-button';
import { CustomDateInput } from '@/components/custom-date-input';
import { addNotification } from '@/utils/show-notification';

import { postUserDateOfBirth } from '../../api/user-api';

import classes from './profile-info.module.css';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (dateOfBirth: Date): void => {
    const date = dayjs(dateOfBirth).format('YYYY-MM-DD');

    if (buttonState === BUTTON_TEXT_EDIT) {
      setButtonState(BUTTON_TEXT_SAVE);
      setInputState(false);
    } else {
      inputRef.current?.blur();
      setButtonState(BUTTON_TEXT_EDIT);
      setInputState(true);
      postUserDateOfBirth(date)
        .then(() =>
          addNotification({ message: 'Birthday was successfully changed', title: 'Birthday change', type: 'success' }),
        )
        .catch((error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : String(error);
          addNotification({ message: errorMessage, title: 'Error', type: 'error' });
        });
    }
  };

  const buttonStyle = clsx({
    [classes.editButton!]: true,
    [classes.isSave!]: !inputState,
  });

  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((user) => {
        handleSubmit(user.dateOfBirth);
      })}
    >
      <CustomDateInput
        className={classes.customInput}
        disabled={inputState}
        label="Birthday"
        ref={inputRef}
        {...form.getInputProps('dateOfBirth')}
      />
      <BaseButton className={buttonStyle} type="submit">
        {buttonState}
      </BaseButton>
    </form>
  );
};

export { ProfileDateOfBirth };
