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
        children: [
          {
            element: <ProductPage />,
            path: 'catalog/:productId',
          },
        ],
        element: <CategoryPage />,
        path: APP_ROUTES.Store,
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
