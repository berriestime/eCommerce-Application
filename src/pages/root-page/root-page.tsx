import type { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './root-page.module.css';

const RootPage: FC = () => {
  return (
    <div className={s.container}>
      {' '}
      <Link to="/login">Go to Login Page</Link>Root Page
    </div>
  );
};

export { RootPage };
