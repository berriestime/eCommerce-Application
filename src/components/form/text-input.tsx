import { LegacyRef, ReactElement, forwardRef } from 'react';

import { TextInput } from '@mantine/core';

type TextInputProps = {
  label: string;
  required: boolean;
};

const CustomTextInput = forwardRef(function MyInput(
  props: TextInputProps,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  const { label } = props;

  return <TextInput label={label} mt="md" ref={ref} required type="text" />;
});

export { CustomTextInput };
