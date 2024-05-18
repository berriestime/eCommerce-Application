import { LegacyRef, ReactElement, forwardRef } from 'react';

import { TextInput, TextInputProps } from '@mantine/core';

import classes from './custom-text-input.module.css';

const CustomTextInput = forwardRef(function MyInput(
  props: TextInputProps,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  return (
    <TextInput
      {...props}
      classNames={{
        error: classes.error,
        input: classes.input,
        label: classes.label,
        root: classes.root,
        wrapper: classes.wrapper,
      }}
      ref={ref}
    />
  );
});

export { CustomTextInput };
