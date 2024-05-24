import { ReactElement } from 'react';

import { rem } from '@mantine/core';

interface LogoutIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export const LogoutIcon = ({ size, style, ...others }: LogoutIconProps): ReactElement => {
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
      <path d="M40 44V56H8V8H40V20" />
      <path d="M48 40L56 32L48 24" />
      <path d="M28 32H56" />
    </svg>
  );
};
