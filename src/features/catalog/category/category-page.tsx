import type { FC } from 'react';

import { Breadcrumbs } from '@/components/brearcrumbs';

import classes from './category-page.module.css';

const CategoryPage: FC = () => {
  return (
    <div className={classes.container}>
      <Breadcrumbs />
      <h2>Store page</h2>
    </div>
  );
};

export { CategoryPage };
