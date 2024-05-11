import { LegacyRef, ReactElement, forwardRef } from 'react';

import { DateInput, DateInputProps } from '@mantine/dates';

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
        root: classes.root,
        wrapper: classes.wrapper,
      }}
      ref={ref}
    />
  );
});

export { CustomDateInput };
