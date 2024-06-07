import type { Customer } from '@commercetools/platform-sdk';

import type { ReactElement } from 'react';
import { useState } from 'react';

import { useForm } from '@mantine/form';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { CustomTextInput } from '@/components/custom-text-input';
import { addNotification } from '@/utils/show-notification';

import { postUserFirstName } from '../../api/user-api';

import classes from './profile-info.module.css';

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
      postUserFirstName(firstName)
        .then(() =>
          addNotification({
            message: 'First name has been successfully changed',
            title: 'First name change',
            type: 'success',
          }),
        )
        .catch((error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : String(error);
          addNotification({ message: errorMessage, title: 'Error', type: 'error' });
        });
    }
  };

  const buttonStyle = clsx({
    [classes.editButton as string]: true,
    [classes.isSave as string]: !inputState,
  });

  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((user) => {
        handleClick(user.firstName);
      })}
    >
      <CustomTextInput
        className={classes.customInput}
        disabled={inputState}
        label="First Name"
        {...form.getInputProps('firstName')}
      />
      <BaseButton className={buttonStyle} type="submit">
        {buttonState}
      </BaseButton>
    </form>
  );
};

export { ProfileFirstName };
