import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/layout/layout';

import s from './login-page.module.css';

const LoginPage: FC = () => {
  return (
    <Layout>
      <div className={s.container}>
        <Link to="/">Go to Main Page</Link> Login Page
      </div>
    </Layout>
  );
};

export { LoginPage };
