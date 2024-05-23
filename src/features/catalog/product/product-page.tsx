import type { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Breadcrumbs } from '@/components/brearcrumbs';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  const data = useLoaderData();
  console.log('PRODUCT', data);

  return (
    <div className={classes.container}>
      <Breadcrumbs />
    </div>
  );
};

export { ProductPage };
