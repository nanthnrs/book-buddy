import { AuthActions } from './auth.actions';
import { authReducer, initialAuthState } from './auth.reducer';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = authReducer(initialAuthState, action);

      expect(result).toBe(initialAuthState);
    });
  });

  describe('loadAuthSuccess action', () => {
    it('should return the previous state', () => {
      const user = { name: 'user', email: 'user@email.com' };
      const action = AuthActions.loadAuthSuccess(user);
      const result = authReducer(initialAuthState, action);
      expect(result).toEqual({
        user: user,
        authenticated: true,
      });
    });
  });

  describe('loadAuthFailure action', () => {
    it('should clear auth state', () => {
      const action = AuthActions.loadAuthFailure();
      const prevState = {
        user: { name: 'user', email: 'user@email.com' },
        authenticated: true,
      };
      const result = authReducer(prevState, action);
      expect(result).toEqual(initialAuthState);
    });
  });
});
