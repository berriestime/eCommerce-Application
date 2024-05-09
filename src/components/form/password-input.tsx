import { LegacyRef, ReactElement, forwardRef } from 'react';

import { PasswordInput } from '@mantine/core';

interface PasswordInputProps {
  label: 'Confirm password' | 'Password';
}

const CustomPasswordInput = forwardRef(function MyPassword(
  props: PasswordInputProps,
  ref: LegacyRef<HTMLInputElement>,
): ReactElement {
  const { label } = props;

  return <PasswordInput label={label} mt="md" ref={ref} required type="password" />;
});

export { CustomPasswordInput };
