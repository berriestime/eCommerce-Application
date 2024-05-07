import type { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './cart-page.module.css';

const CartPage: FC = () => {
  return (
    <div className={s.container}>
      <h2>Cart page</h2>
      <Link to="/">Go to Main Page</Link>
    </div>
  );
};

export { CartPage };
