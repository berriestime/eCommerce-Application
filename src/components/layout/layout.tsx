import { Outlet } from 'react-router-dom';

import { Header } from '../header';

import s from './layout.module.css';

const Layout = (): JSX.Element => {
  return (
    <div className={s.layout}>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer>2024</footer>
    </div>
  );
};

export { Layout };
