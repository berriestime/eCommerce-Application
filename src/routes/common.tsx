import { NotFoundPage } from '@/components/not-found-page/not-found-page';
import { RootPage } from '@/features/root-page';

const commonRoutes = [
  {
    element: <RootPage />,
    path: '/',
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
];

export { commonRoutes };
