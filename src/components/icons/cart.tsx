import { type ReactElement } from 'react';

import { rem } from '@mantine/core';

interface CartIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export const CartIcon = ({ size, style, ...others }: CartIconProps): ReactElement => {
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
      <path d="M16 20H56L52 44H16V8H8" />
      <path d="M20 56C22.2091 56 24 54.2091 24 52C24 49.7909 22.2091 48 20 48C17.7909 48 16 49.7909 16 52C16 54.2091 17.7909 56 20 56Z" />
      <path d="M48 56C50.2091 56 52 54.2091 52 52C52 49.7909 50.2091 48 48 48C45.7909 48 44 49.7909 44 52C44 54.2091 45.7909 56 48 56Z" />
    </svg>
  );
};
