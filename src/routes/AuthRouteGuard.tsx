import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { Box, Loader } from '@mantine/core';

import { useAuth } from '@/hooks';

import type { AuthState } from '../types/authState';

import classes from '@/components/loader/loader.module.css';

type Props = {
  authRejectStatus: AuthState;
  children: ReactNode;
  rejectRoute: string;
};

export const AuthRouteGuard = ({ authRejectStatus, children, rejectRoute }: Props): ReactNode => {
  const authState = useAuth();

  if (authState === 'PENDING') {
    return (
      <Box className={classes.box}>
        <Loader />
      </Box>
    );
  }

  if (authState === authRejectStatus) {
    return <Navigate replace={true} to={rejectRoute} />;
  }

  return children;
};
