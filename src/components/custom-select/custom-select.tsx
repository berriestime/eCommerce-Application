import { LegacyRef, ReactElement, forwardRef } from 'react';

import { Select, SelectProps } from '@mantine/core';
import clsx from 'clsx';

import classes from './custom-select.module.css';

type Props = {
  inline?: boolean;
} & SelectProps;

const CustomSelect = forwardRef(function MyInput(
  { classNames, inline = false, ...props }: Props,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  if (classNames instanceof Function) {
    throw new Error('Unsupported!');
  }
  return (
    <Select
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

export { CustomSelect };
