import { useEffect } from 'react';

import { setAuthState } from '@/features/auth/authSlice';
import { getRefreshToken } from '@/lib/commerstools/token-cache';
import { store } from '@/store';

export const useAuthStateChange = (): void => {
  useEffect(() => {
    const isPassword = getRefreshToken('lava-lamps-password-token');
    const authState = isPassword ? 'AUTHENTICATED' : 'UNAUTHENTICATED';

    store.dispatch(setAuthState(authState));
  }, []);
};
