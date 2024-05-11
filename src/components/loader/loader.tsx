import { forwardRef } from 'react';

import { Box, MantineLoaderComponent } from '@mantine/core';
import cx from 'clsx';

import classes from './loader.module.css';

interface CssLoaderProps {
  className?: string;
}

export const CssLoader: MantineLoaderComponent = forwardRef(({ className, ...others }: CssLoaderProps, ref) => (
  <Box className={cx(classes.loader, className)} component="span" {...others} ref={ref} />
));

CssLoader.displayName = 'CssLoader';
