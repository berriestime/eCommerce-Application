import { type LegacyRef, type ReactElement, forwardRef } from 'react';

import { PasswordInput, type PasswordInputProps } from '@mantine/core';

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
        label: classes.label,
        root: classes.root,
        wrapper: classes.wrapper,
      }}
      ref={ref}
    />
  );
});

export { CustomPasswordInput };
