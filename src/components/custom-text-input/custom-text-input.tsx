import { LegacyRef, ReactElement, forwardRef } from 'react';

import { TextInput, TextInputProps } from '@mantine/core';
import clsx from 'clsx';

import classes from './custom-text-input.module.css';

type Props = {
  inline?: boolean;
} & TextInputProps;

const CustomTextInput = forwardRef(function MyInput(
  { inline = false, ...props }: Props,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  return (
    <TextInput
      {...props}
      classNames={{
        error: classes.error,
        input: classes.input,
        label: classes.label,
        root: clsx({ [classes.root!]: true, [classes.rootInline!]: inline }),
        wrapper: classes.wrapper,
      }}
      ref={ref}
    />
  );
});

export { CustomTextInput };
