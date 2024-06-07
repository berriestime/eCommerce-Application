import { type LegacyRef, type ReactElement, forwardRef } from 'react';

import { TextInput, type TextInputProps } from '@mantine/core';
import { clsx } from 'clsx';

import classes from './custom-text-input.module.css';

type Props = {
  inline?: boolean;
} & TextInputProps;

const CustomTextInput = forwardRef(function MyInput(
  { classNames, inline = false, ...props }: Props,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  if (classNames instanceof Function) {
    throw new Error('Unsupported!');
  }
  return (
    <TextInput
      {...props}
      classNames={{
        ...classNames,
        error: clsx(classes.error, classNames?.error),
        input: clsx(classes.input, classNames?.input),
        label: clsx(classes.label, classNames?.label),
        root: clsx({ [classes.root!]: true, [classes.rootInline!]: inline }, classNames?.root),
        wrapper: clsx(classes.wrapper, classNames?.wrapper),
      }}
      ref={ref}
    />
  );
});

export { CustomTextInput };
