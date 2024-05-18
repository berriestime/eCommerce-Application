import type { FC } from 'react';

import { BreadC } from '@/components/brearcrumbs/breadcrumbs';

import s from './category-page.module.css';

const CategoryPage: FC = () => {
  return (
    <div className={s.container}>
      <BreadC />
      <h2>Category page</h2>
    </div>
  );
};

export { CategoryPage };
