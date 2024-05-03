import { useRoutes } from 'react-router-dom';

import { authorizedRoutes } from './authorized';
import { commonRoutes } from './common';
import { unauthorizedRoutes } from './unauthorized';

export const AppRoutes = (): JSX.Element => {
  const auth = false;

  const routes = auth ? authorizedRoutes : unauthorizedRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
