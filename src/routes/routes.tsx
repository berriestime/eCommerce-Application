import { Link } from 'react-router-dom';

import { Category, Product } from '@commercetools/platform-sdk';

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

import { loader as StoreLoader } from '@/features/catalog/catalog-data-loader';
import { loader as CategoryLoader } from '@/features/catalog/category/category-data-loader';
import { loader as SubcategoryLoader } from '@/features/catalog/category/subcategory-data-loader';
import { loader as ProductLoader } from '@/features/catalog/product/product-data-loader';

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
          crumb: () => <span key="1">Store</span>,
        },
        loader: StoreLoader,
        path: APP_ROUTES.Store,
      },
      {
        element: <CategoryPage />,
        handle: {
          crumb: ({ categoryData }: { categoryData: Category }) => [
            <Link key="1" to={`/${APP_ROUTES.Store}`}>
              Store
            </Link>,
            <span key="2">{categoryData.name['en-US']}</span>,
          ],
        },
        loader: CategoryLoader,
        path: `${APP_ROUTES.Store}/:categoryId`,
      },
      {
        element: <CategoryPage />,
        handle: {
          crumb: ({ categoryData, subcategoryData }: { categoryData: Category; subcategoryData: Category }) => [
            <Link key="1" to={`/${APP_ROUTES.Store}`}>
              Store
            </Link>,
            <Link key="2" to={`/${APP_ROUTES.Store}/${categoryData.key}`}>
              {categoryData.name['en-US']}
            </Link>,
            <span key="3"> {subcategoryData.name['en-US']}</span>,
          ],
        },
        loader: SubcategoryLoader,
        path: `${APP_ROUTES.Store}/:categoryId/:subcategoryId`,
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
            productData: Product;
            subcategoryData: Category;
          }) => [
            <Link key="1" to={`/${APP_ROUTES.Store}`}>
              Store
            </Link>,
            <Link key="2" to={`/${APP_ROUTES.Store}/${categoryData.key}`}>
              {categoryData.name['en-US']}
            </Link>,
            <Link key="3" to={`/${APP_ROUTES.Store}/${categoryData.key}/${subcategoryData.key}`}>
              {subcategoryData.name['en-US']}
            </Link>,
            <span key="4">{productData.masterData.current.name['en-US']}</span>,
          ],
        },
        loader: ProductLoader,
        path: `${APP_ROUTES.Store}/:categoryId/:subcategoryId/:productId`,
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
