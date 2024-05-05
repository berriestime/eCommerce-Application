import { Layout } from '@/components/layout';
import { NotFoundPage } from '@/components/not-found-page/not-found-page';
import { CategoryPage } from '@/features/catalog/category/category-page';
import { ProductPage } from '@/features/catalog/product/product-page';
import { LoginPage } from '@/features/login-page';
import { Profile } from '@/features/profile/profile';
import { RootPage } from '@/features/root-page';

import { AuthRouteGuard } from './AuthRouteGuard';

export const routes = [
  {
    children: [
      {
        element: <RootPage />,
        index: true,
      },
      {
        element: (
          <AuthRouteGuard authRejectStatus="AUTHENTICATED" rejectRoute="/">
            <LoginPage />
          </AuthRouteGuard>
        ),
        path: 'login',
      },
      {
        element: (
          <AuthRouteGuard authRejectStatus="UNAUTHENTICATED" rejectRoute="/login">
            <Profile />
          </AuthRouteGuard>
        ),
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
