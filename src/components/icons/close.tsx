import { type ReactElement } from 'react';

import { rem } from '@mantine/core';

interface CloseIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export const CloseIcon = ({ size, style, ...others }: CloseIconProps): ReactElement => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
      style={{ height: rem(size), width: rem(size), ...style }}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path d="M16 16L48 48" />
      <path d="M48 16L16 48" />
    </svg>
  );
};
