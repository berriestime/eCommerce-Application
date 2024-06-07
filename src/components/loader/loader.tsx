import { forwardRef } from 'react';

import { Box, type MantineLoaderComponent } from '@mantine/core';
import { clsx } from 'clsx';

import classes from './loader.module.css';

interface CssLoaderProps {
  className?: string;
}

export const CssLoader: MantineLoaderComponent = forwardRef(({ className, ...others }: CssLoaderProps, ref) => (
  <Box className={clsx(classes.loader, className)} component="span" {...others} ref={ref} />
));

CssLoader.displayName = 'CssLoader';
