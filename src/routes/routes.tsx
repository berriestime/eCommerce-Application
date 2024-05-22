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

export const APP_ROUTES = {
  Cart: 'cart',
  Login: 'login',
  Main: '/',
  Profile: 'profile',
  Registration: 'registration',
  Store: 'store',
  Team: 'team',
} as const;

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
        path: APP_ROUTES.Login,
      },
      {
        element: (
          <AuthRouteGuard authRejectStatus="AUTHENTICATED" rejectRoute="/">
            <RegistrationPage />
          </AuthRouteGuard>
        ),
        path: APP_ROUTES.Registration,
      },
      {
        element: (
          <AuthRouteGuard authRejectStatus="UNAUTHENTICATED" rejectRoute="/login">
            <Profile />
          </AuthRouteGuard>
        ),
        path: APP_ROUTES.Profile,
      },
      {
        element: <CatalogPage />,
        handle: {
          crumb: () => <span key="1">Catalog</span>,
        },
        path: APP_ROUTES.Store,
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
        path: APP_ROUTES.Team,
      },
      {
        element: <CartPage />,
        path: APP_ROUTES.Cart,
      },
    ],
    element: <Layout />,
    errorElement: <NotFoundPage />,
    path: APP_ROUTES.Main,
  },
];
