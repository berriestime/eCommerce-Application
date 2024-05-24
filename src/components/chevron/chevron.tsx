import { clsx } from 'clsx';

import classes from './chevron.module.css';

const Chevron = ({ rotated }: { rotated: boolean }): JSX.Element => (
  <span className={clsx(classes.chevron, { [classes.rotated!]: rotated })} />
);

export { Chevron };
