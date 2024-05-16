import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { AuthState } from '@/types/authState';

type State = {
  authState: AuthState;
};

const initialState: State = {
  authState: 'PENDING',
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.authState = action.payload;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
