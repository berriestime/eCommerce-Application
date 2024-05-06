import { ReactElement } from 'react';

import { PasswordInput } from '@mantine/core';

interface PasswordInputProps {
  label: 'Confirm password' | 'Password';
}

const CustomPasswordInput = (props: PasswordInputProps): ReactElement => {
  const { label } = props;

  return <PasswordInput label={label} mt="md" required type="password" />;
};

export { CustomPasswordInput };
