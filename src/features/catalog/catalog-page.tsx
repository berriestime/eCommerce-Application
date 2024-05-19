import type { FC } from 'react';

import { Breadcrumbs } from '@/components/brearcrumbs';

const CatalogPage: FC = () => {
  return (
    <div>
      <Breadcrumbs />
      <h2>Store page</h2>
    </div>
  );
};

export { CatalogPage };
