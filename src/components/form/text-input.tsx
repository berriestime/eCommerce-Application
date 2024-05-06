import { ReactElement } from 'react';

import { TextInput } from '@mantine/core';

type TextInputProps = {
  label: string;
  required: boolean;
};

const CustomTextInput = (props: TextInputProps): ReactElement => {
  const { label } = props;
  const { required } = props;

  return <TextInput label={label} required={required} />;
};

export { CustomTextInput };
