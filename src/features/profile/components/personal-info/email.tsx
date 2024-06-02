import type { Customer } from '@commercetools/platform-sdk';

import type { ReactElement } from 'react';
import { useState } from 'react';

import { useForm } from '@mantine/form';
import { clsx } from 'clsx';

import { BaseButton } from '@/components/base-button';
import { CustomTextInput } from '@/components/custom-text-input';
import { addNotification } from '@/utils/show-notification';
import { isEmail } from '@/utils/validate/isEmail';

import { postUserNewEmail } from '../../api/user-api';

import classes from './profile-info.module.css';

const BUTTON_TEXT_EDIT = 'Edit';
const BUTTON_TEXT_SAVE = 'Save';

const ProfileEmail = (user: Customer): ReactElement => {
  const email = user.email ? user.email : '';

  const form = useForm({
    initialValues: {
      email,
    },
    mode: 'uncontrolled',

    validate: {
      email: isEmail('Invalid email'),
    },
    validateInputOnChange: true,
  });

  const [buttonState, setButtonState] = useState(BUTTON_TEXT_EDIT);
  const [inputState, setInputState] = useState(true);

  const handleClick = (email: string): void => {
    if (buttonState === BUTTON_TEXT_EDIT) {
      setButtonState(BUTTON_TEXT_SAVE);
      setInputState(false);
    } else {
      setButtonState(BUTTON_TEXT_EDIT);
      setInputState(true);
      postUserNewEmail(email)
        .then(() =>
          addNotification({ message: 'Email has been successfully changed', title: 'Email change', type: 'success' }),
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
        handleClick(user.email);
      })}
    >
      <CustomTextInput
        className={classes.customInput}
        disabled={inputState}
        label="Email"
        {...form.getInputProps('email')}
      />
      <BaseButton className={buttonStyle} type="submit">
        {buttonState}
      </BaseButton>
    </form>
  );
};

export { ProfileEmail };
