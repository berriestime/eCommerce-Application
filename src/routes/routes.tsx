import { Layout } from '@/components/layout';

import { AuthRouteGuard } from './AuthRouteGuard';
import {
  CartPage,
  CategoryPage,
  LoginPage,
  NotFoundPage,
  ProductPage,
  Profile,
  RegistrationPage,
  RootPage,
  TeamPage,
} from './lazy';

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
          <AuthRouteGuard authRejectStatus="AUTHENTICATED" rejectRoute="/">
            <RegistrationPage />
          </AuthRouteGuard>
        ),
        path: 'registration',
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
      {
        element: <TeamPage />,
        path: 'team',
      },
      {
        element: <CartPage />,
        path: 'cart',
      },
    ],
    element: <Layout />,
    errorElement: <NotFoundPage />,
    path: '/',
  },
];
