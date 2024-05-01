import { Header } from '../header';

import s from './layout.module.css';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className={s.layout}>
      <Header />
      {children}
    </div>
  );
};

export { Layout };
