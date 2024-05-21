import type { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './product-page.module.css';

const ProductPage: FC = () => {
  return (
    <div className={classes.container}>
      <h2>Product page</h2>
      <Link to="/">Go to Main Page</Link> Login Page
    </div>
  );
};

export { ProductPage };
