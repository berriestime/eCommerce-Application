import { type ReactElement } from 'react';

import { rem } from '@mantine/core';

interface ChevronIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export const ChevronIcon = ({ size, style, ...others }: ChevronIconProps): ReactElement => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ height: rem(size), width: rem(size), ...style }}
      viewBox="0 0 12 7"
      xmlns="http://www.w3.org/2000/svg"
      {...others}
    >
      <path d="M1 0.5L6 5.5L11 0.5" stroke="#F3E7E4" />
    </svg>
  );
};
