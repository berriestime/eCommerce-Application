import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import type { AuthState } from '../types/authState';

type Props = {
  authRejectStatus: AuthState;
  children: ReactNode;
  rejectRoute: string;
};

export const AuthRouteGuard = ({ authRejectStatus, children, rejectRoute }: Props): ReactNode => {
  const authState = 'UNAUTHENTICATED';

  if (authState === authRejectStatus) {
    return <Navigate replace={true} to={rejectRoute} />;
  }

  return children;
};
