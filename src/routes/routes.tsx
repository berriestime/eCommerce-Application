import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page/not-found-page';
import { CategoryPage } from '@/features/catalog/category/category-page';
import { ProductPage } from '@/features/catalog/product/product-page';
import { LoginPage } from '@/features/login-page';
import { Profile } from '@/features/profile/profile';
import { RootPage } from '@/features/root-page';

export const routes = [
  {
    children: [
      {
        element: <RootPage />,
        index: true,
      },
      {
        element: <LoginPage />,
        path: 'login',
      },
      {
        element: <Profile />,
        path: 'dashboard',
      },
      {
        children: [
          {
            element: <ProductPage />,
            path: 'catalog/:productId',
          },
        ],
        element: <CategoryPage />,
        path: 'catalog',
      },
    ],
    element: <Layout />,
    errorElement: <NotFoundPage />,
    path: '/',
  },
];
