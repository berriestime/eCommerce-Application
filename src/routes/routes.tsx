import { RouteObject } from 'react-router-dom';

import { authorizedRoutes } from './authorized';
import { commonRoutes } from './common';
import { unauthorizedRoutes } from './unauthorized';

const makeRoutes = (): RouteObject[] => {
  const res = [...commonRoutes];
  if (isAuthenticated()) {
    res.push(...authorizedRoutes);
  } else {
    res.push(...unauthorizedRoutes);
  }
  return res;
};

const routes = makeRoutes();

function isAuthenticated(): boolean {
  return false;
}

export { routes };
