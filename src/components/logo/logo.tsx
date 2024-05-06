import type { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.svg';

import s from './logo.module.css';

const Logo: FC = () => {
  return (
    <Link to="/">
      <img alt="logo" className={s.logo} src={logo} />
    </Link>
  );
};

export { Logo };
