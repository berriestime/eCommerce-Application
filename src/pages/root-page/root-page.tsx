import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/layout/layout';

import s from './root-page.module.css';

const RootPage: FC = () => {
  return (
    <Layout>
      <div className={s.container}>
        {' '}
        <Link to="/login">Go to Login Page</Link>Root Page
      </div>
    </Layout>
  );
};

export { RootPage };
