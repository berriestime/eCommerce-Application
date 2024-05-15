import { useEffect } from 'react';

import { setAuthState } from '@/features/auth/authSlice';
// import { apiRootAnonymous } from '@/lib/commerstools/create-anonymous-client';
import { apiRootLogin } from '@/lib/commerstools/create-password-client';
import { apiRootRefresh } from '@/lib/commerstools/create-refresh-client';
import { store } from '@/store';

export const useAuthStateChange = (): void => {
  useEffect(() => {
    const unsub = (): void => {
      const authState = apiRootLogin === null && apiRootRefresh === null ? 'UNAUTHENTICATED' : 'AUTHENTICATED';
      // const authState = apiRootLogin === null && apiRootRefresh === null ? 'AUTHENTICATED' : 'UNAUTHENTICATED';
      store.dispatch(setAuthState(authState));
    };

    return () => {
      unsub();
    };
  }, []);
};
