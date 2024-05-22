import { forwardRef } from 'react';

import { Button, type ButtonProps, createPolymorphicComponent } from '@mantine/core';

import classes from './base-button.module.css';

const BaseButtonUnwrapped = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...others }, ref) => (
  <Button {...others} className={className ? className : classes.control} ref={ref} variant="light">
    {children}
  </Button>
));

BaseButtonUnwrapped.displayName = 'BaseButton';

const BaseButton = createPolymorphicComponent<'button', ButtonProps>(BaseButtonUnwrapped);

export { BaseButton };
