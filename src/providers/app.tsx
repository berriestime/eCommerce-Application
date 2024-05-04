import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';

export const AppProvider = (): JSX.Element => {
  return <RouterProvider router={router} />;
};
