import { type ReactElement } from 'react';

import { rem } from '@mantine/core';

interface ProfileIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export const ProfileIcon = ({ size, style, ...others }: ProfileIconProps): ReactElement => {
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
      <path d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z" />
      <path d="M32 37.35C36.4128 37.35 39.99 32.5819 39.99 26.7001C39.99 20.8182 36.4128 16.05 32 16.05C27.5873 16.05 24.01 20.8182 24.01 26.7001C24.01 32.5819 27.5873 37.35 32 37.35Z" />
      <path d="M25.28 32.9399C25.28 32.9399 18.08 36.0199 17.24 38.3299C15.93 41.9499 15.89 49.7999 15.89 49.7999" />
      <path d="M47.99 49.8899C47.99 49.8899 47.93 41.98 46.61 38.32C45.78 36.03 38.71 32.95 38.71 32.95" />
    </svg>
  );
};
