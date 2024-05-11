import { LegacyRef, ReactElement, forwardRef } from 'react';

import { PasswordInput, PasswordInputProps } from '@mantine/core';

import classes from './custom-password-input.module.css';

const CustomPasswordInput = forwardRef(function MyInput(
  props: PasswordInputProps,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  return (
    <PasswordInput
      {...props}
      classNames={{
        input: classes.input,
        root: classes.root,
        wrapper: classes.wrapper,
      }}
      ref={ref}
    />
  );
});

export { CustomPasswordInput };
