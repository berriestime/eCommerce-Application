import { type LegacyRef, type ReactElement, forwardRef } from 'react';

import { Select, type SelectProps } from '@mantine/core';
import { clsx } from 'clsx';

import { ChevronIcon } from '../icons/chevron';

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
      rightSection={<ChevronIcon size={12} />}
    />
  );
});

export { CustomSelect };
