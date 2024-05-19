import type { FC } from 'react';

import { Breadcrumbs } from '@/components/brearcrumbs';

import s from './category-page.module.css';

const CategoryPage: FC = () => {
  return (
    <div className={s.container}>
      <Breadcrumbs />
      <h2>Category page</h2>
    </div>
  );
};

export { CategoryPage };
