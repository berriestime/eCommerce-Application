import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from './pages/login-page';
import { RootPage } from './pages/root-page';

const router = createBrowserRouter([
  {
    element: <RootPage />,
    path: '/',
  },
  {
    element: <LoginPage />,
    path: '/login',
  },
]);

const node = document.getElementById('root');
if (!node) {
  throw new Error('You forgot to add root node to index.html');
}
const root = createRoot(node);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
