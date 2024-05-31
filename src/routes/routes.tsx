import { Link } from 'react-router-dom';

import { Category, ProductProjection } from '@commercetools/platform-sdk';

import { Layout } from '@/components/layout';
import { LANGUAGE } from '@/constants/catalog-constants';

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

export const APP_ROUTE = {
  Cart: 'cart',
  Login: 'login',
  Main: '/',
  Profile: 'profile',
  Registration: 'registration',
  Store: 'store',
  Team: 'team',
} as const;

import { loader as StoreLoader } from '@/features/catalog/catalog-data-loader';
import { loader as CategoryLoader } from '@/features/catalog/category/category-data-loader';
import { loader as SubcategoryLoader } from '@/features/catalog/category/subcategory-data-loader';
import { loader as ProductLoader } from '@/features/catalog/product/product-data-loader';
import { loader as ProfileLoader } from '@/features/profile/profile-data-loader';

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
        path: APP_ROUTE.Login,
      },
      {
        element: (
          <AuthRouteGuard authRejectStatus="AUTHENTICATED" rejectRoute="/">
            <RegistrationPage />
          </AuthRouteGuard>
        ),
        path: APP_ROUTE.Registration,
      },
      {
        element: (
          <AuthRouteGuard authRejectStatus="UNAUTHENTICATED" rejectRoute="/login">
            <Profile />
          </AuthRouteGuard>
        ),
        loader: ProfileLoader,
        path: APP_ROUTE.Profile,
      },
      {
        element: <CatalogPage />,
        handle: {
          crumb: () => <span key="1">Store</span>,
        },
        loader: StoreLoader,
        path: APP_ROUTE.Store,
      },
      {
        element: <CategoryPage />,
        handle: {
          crumb: ({ categoryData }: { categoryData: Category }) => [
            <Link key="1" to={`/${APP_ROUTE.Store}`}>
              Store
            </Link>,
            <span key="2">{categoryData.name[LANGUAGE]}</span>,
          ],
        },
        loader: CategoryLoader,
        path: `${APP_ROUTE.Store}/:categoryId`,
      },
      {
        element: <CategoryPage />,
        handle: {
          crumb: ({ categoryData, subcategoryData }: { categoryData: Category; subcategoryData: Category }) => [
            <Link key="1" to={`/${APP_ROUTE.Store}`}>
              Store
            </Link>,
            <Link key="2" to={`/${APP_ROUTE.Store}/${categoryData.key}`}>
              {categoryData.name[LANGUAGE]}
            </Link>,
            <span key="3"> {subcategoryData.name[LANGUAGE]}</span>,
          ],
        },
        loader: SubcategoryLoader,
        path: `${APP_ROUTE.Store}/:categoryId/:subcategoryId`,
      },
      {
        element: <ProductPage />,
        handle: {
          crumb: ({
            categoryData,
            productData,
            subcategoryData,
          }: {
            categoryData: Category;
            productData: ProductProjection;
            subcategoryData: Category;
          }) => [
            <Link key="1" to={`/${APP_ROUTE.Store}`}>
              Store
            </Link>,
            <Link key="2" to={`/${APP_ROUTE.Store}/${categoryData.key}`}>
              {categoryData.name[LANGUAGE]}
            </Link>,
            <Link key="3" to={`/${APP_ROUTE.Store}/${categoryData.key}/${subcategoryData.key}`}>
              {subcategoryData.name[LANGUAGE]}
            </Link>,
            <span key="4">{productData.name[LANGUAGE]}</span>,
          ],
        },
        loader: ProductLoader,
        path: `${APP_ROUTE.Store}/:categoryId/:subcategoryId/:productId`,
      },

      {
        element: <TeamPage />,
        path: APP_ROUTE.Team,
      },
      {
        element: <CartPage />,
        path: APP_ROUTE.Cart,
      },
    ],
    element: <Layout />,
    errorElement: <NotFoundPage />,
    path: APP_ROUTE.Main,
  },
];
