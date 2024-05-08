import { forwardRef } from 'react';

import { Button, type ButtonProps, createPolymorphicComponent } from '@mantine/core';

import classes from './base-button.module.css';

const BaseButtonUnwrapped = forwardRef<HTMLButtonElement, ButtonProps>(({ children, ...others }, ref) => (
  <Button {...others} className={classes.control} ref={ref} size="md" variant="light">
    {children}
  </Button>
));

BaseButtonUnwrapped.displayName = 'BaseButton';

const BaseButton = createPolymorphicComponent<'button', ButtonProps>(BaseButtonUnwrapped);

export { BaseButton };
