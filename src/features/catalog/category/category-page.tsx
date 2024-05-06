import type { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './category-page.module.css';

const CategoryPage: FC = () => {
  return (
    <div className={s.container}>
      <h2>Category page</h2>
      <Link to="/">Go to Main Page</Link> Login Page
    </div>
  );
};

export { CategoryPage };
