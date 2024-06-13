import { lazy } from 'react';

export const NotFoundPage = lazy(() =>
  import('@/components/not-found-page/not-found-page').then((module) => ({ default: module.NotFoundPage })),
);
export const CartPage = lazy(() =>
  import('@/features/cart/cart-page').then((module) => ({ default: module.CartPage })),
);
export const CatalogPage = lazy(() =>
  import('@/features/catalog/catalog-page').then((module) => ({ default: module.CatalogPage })),
);
export const CategoryPage = lazy(() =>
  import('@/features/catalog/category/category-page').then((module) => ({ default: module.CategoryPage })),
);
export const ProductPage = lazy(() =>
  import('@/features/catalog/product/product-page').then((module) => ({ default: module.ProductPage })),
);
export const LoginPage = lazy(() =>
  import('@/features/login-page/components').then((module) => ({ default: module.LoginPage })),
);
export const Profile = lazy(() => import('@/features/profile/profile').then((module) => ({ default: module.Profile })));
export const RegistrationPage = lazy(() =>
  import('@/features/registration-page').then((module) => ({ default: module.RegistrationPage })),
);
export const RootPage = lazy(() => import('@/features/root-page').then((module) => ({ default: module.RootPage })));
export const AboutUs = lazy(() =>
  import('@/features/about-us/about-us').then((module) => ({ default: module.AboutUs })),
);
