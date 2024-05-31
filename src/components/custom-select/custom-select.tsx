import { LegacyRef, ReactElement, forwardRef } from 'react';

import { Select, SelectProps } from '@mantine/core';
import clsx from 'clsx';

import classes from './custom-select.module.css';

type Props = {
  inline?: boolean;
} & SelectProps;

const CustomSelect = forwardRef(function MyInput(
  { inline = false, ...props }: Props,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  return (
    <Select
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

export { CustomSelect };
