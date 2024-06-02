import { type LegacyRef, type ReactElement, forwardRef } from 'react';

import { DateInput, type DateInputProps } from '@mantine/dates';

import classes from './custom-date-input.module.css';

const CustomDateInput = forwardRef(function MyInput(
  props: DateInputProps,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  return (
    <DateInput
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

export { CustomDateInput };
