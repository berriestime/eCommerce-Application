import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs } from '@/components/brearcrumbs';

import s from './product-page.module.css';

const ProductPage: FC = () => {
  return (
    <div className={s.container}>
      <Breadcrumbs />
      <h2>Product page</h2>
      <Link to="/">Go to Main Page</Link> Login Page
    </div>
  );
};

export { ProductPage };
