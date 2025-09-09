import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadAuth', () => {
    it('should set auth action when get profile successfully', (done) => {
      const profile = { name: 'user', email: 'user@email.com' };
      spyOn(authService, 'getProfile').and.returnValue(of({ data: profile }));

      actions$ = of(AuthActions.loadAuth());

      effects.loadAuths$.subscribe((action) => {
        expect(authService.getProfile).toHaveBeenCalled();
        expect(action).toEqual(
          AuthActions.setAuth({
            name: profile.name,
            email: profile.email,
          }),
        );
        done();
      });
    });

    it('should clear auth action when get profile failed', (done) => {
      spyOn(authService, 'getProfile').and.returnValue(throwError(() => new Error('Error')));

      actions$ = of(AuthActions.loadAuth());

      effects.loadAuths$.subscribe((action) => {
        expect(authService.getProfile).toHaveBeenCalled();
        expect(action).toEqual(AuthActions.clearAuth());
        done();
      });
    });
  });
});
