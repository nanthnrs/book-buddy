import * as fromAuth from './auth.reducer';
import {
  selectAuthState,
  selectIsAuthenticated,
  selectUser,
} from './auth.selectors';

describe('Auth Selectors', () => {
  let userMock: { name: string; email: string };

  beforeEach(() => {
    userMock = { name: 'user', email: 'user@email.com' };
  });

  it('should select the feature state', () => {
    const result = selectAuthState({
      [fromAuth.authFeatureKey]: fromAuth.initialAuthState,
    });

    expect(result).toEqual({
      user: {
        name: '',
        email: '',
      },
      authenticated: false,
    });
  });

  it('should select user', () => {
    const result = selectUser.projector({
      user: userMock,
      authenticated: true,
    });
    expect(result).toEqual(userMock);
  });

  it('should select is authenticated and return value correctly', () => {
    const result = selectIsAuthenticated.projector({
      user: userMock,
      authenticated: true,
    });
    expect(result).toBeTrue();

    const result2 = selectIsAuthenticated.projector({
      user: { name: '', email: '' },
      authenticated: false,
    });
    expect(result2).toBeFalse();
  });
});
