import type { FC } from 'react';

import logo from '@/assets/images/logo.svg';

import s from './logo.module.css';

const Logo: FC = () => {
  return (
    <a href="/">
      <img alt="logo" className={s.logo} src={logo} />
    </a>
  );
};

export { Logo };
