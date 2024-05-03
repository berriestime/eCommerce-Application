import { Route, Routes } from 'react-router-dom';

import { authorizedRoutes } from './authorized';
import { commonRoutes } from './common';
import { unauthorizedRoutes } from './unauthorized';

export const routes = [
  {
    element: (
      <Routes>
        {[...unauthorizedRoutes, ...(isAuthenticated() ? authorizedRoutes : []), ...commonRoutes].map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Routes>
    ),
    path: '*',
  },
];

function isAuthenticated(): boolean {
  return false;
}
