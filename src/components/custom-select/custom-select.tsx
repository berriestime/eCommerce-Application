import { LegacyRef, ReactElement, forwardRef } from 'react';

import { Select, SelectProps } from '@mantine/core';

import classes from './custom-select.module.css';

const CustomSelect = forwardRef(function MyInput(props: SelectProps, ref: LegacyRef<HTMLInputElement>): ReactElement {
  return (
    <Select
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

export { CustomSelect };
