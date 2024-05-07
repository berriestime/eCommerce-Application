import { Button } from '@mantine/core';

import classes from './base-button.module.css';

type BaseButtonProps = {
  label: string;
  onClick?: () => void;
};

const BaseButton = ({ label, onClick }: BaseButtonProps): JSX.Element => {
  return (
    <Button className={classes.control} mt="xl" onClick={onClick} size="md" variant={'outline'}>
      {label}
    </Button>
  );
};

export { BaseButton };
