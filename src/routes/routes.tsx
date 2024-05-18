import { Link } from 'react-router-dom';

import { Layout } from '@/components/layout';

import { AuthRouteGuard } from './AuthRouteGuard';
import {
  CartPage,
  CatalogPage,
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
        element: <CatalogPage />,
        handle: {
          crumb: () => <span key="1">Catalog</span>,
        },
        path: 'catalog',
      },
      {
        element: <CategoryPage />,
        handle: {
          crumb: () => [
            <Link key="1" to="/catalog">
              Catalog
            </Link>,
            <span key="2">Category</span>,
          ],
        },
        path: '/catalog/:categoryId',
      },
      {
        element: <ProductPage />,
        handle: {
          crumb: () => [
            <Link key="1" to="/catalog">
              Catalog
            </Link>,
            <Link key="2" to="/catalog/33">
              Category
            </Link>,
            <span key="3">Product</span>,
          ],
        },
        path: '/catalog/:categoryId/:productId',
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
