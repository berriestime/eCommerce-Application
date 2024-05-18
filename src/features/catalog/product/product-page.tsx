import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { BreadC } from '@/components/brearcrumbs/breadcrumbs';

import s from './product-page.module.css';

const ProductPage: FC = () => {
  return (
    <div className={s.container}>
      <BreadC />
      <h2>Product page</h2>
      <Link to="/">Go to Main Page</Link> Login Page
    </div>
  );
};

export { ProductPage };
