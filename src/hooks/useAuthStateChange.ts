import { useEffect } from 'react';

import { setAuthState } from '@/features/auth/authSlice';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { store } from '@/store';

export const useAuthStateChange = (): void => {
  useEffect(() => {
    const authState = apiRootLogin === null && apiRootRefresh === null ? 'UNAUTHENTICATED' : 'AUTHENTICATED';
    store.dispatch(setAuthState(authState));
  }, []);
};
