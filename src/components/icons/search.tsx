import { type ReactElement } from 'react';

import { rem } from '@mantine/core';

interface SearchIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export const SearchIcon = ({ size, style, ...others }: SearchIconProps): ReactElement => {
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
      <path d="M28 48C39.0457 48 48 39.0457 48 28C48 16.9543 39.0457 8 28 8C16.9543 8 8 16.9543 8 28C8 39.0457 16.9543 48 28 48Z" />
      <path d="M56 56L42.14 42.14" />
    </svg>
  );
};
