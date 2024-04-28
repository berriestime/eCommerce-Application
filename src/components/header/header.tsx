import type { FC } from 'react';

import s from './header.module.css';

const Header: FC = () => {
  return <header className={s.header}>Hello world</header>;
};

export { Header };
