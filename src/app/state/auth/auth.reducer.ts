import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: {
    name: string;
    email: string;
  };
  authenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: {
    name: '',
    email: '',
  },
  authenticated: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loadAuthSuccess, (state, { name, email }) => ({
    ...state,
    user: {
      name,
      email,
    },
    authenticated: true,
  })),
  on(AuthActions.loadAuthFailure, () => initialAuthState),
  on(AuthActions.signOut, () => initialAuthState),
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: authReducer,
});
