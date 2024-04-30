import type { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './login-page.module.css';

const LoginPage: FC = () => {
  return (
    <div className={s.container}>
      <Link to="/">Go to Main Page</Link> Login Page
    </div>
  );
};

export { LoginPage };
