import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: AuthService;
  let router: Router;

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
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadAuth', () => {
    it('should call loadAuthSuccess action when get profile successfully', (done) => {
      const profile = { name: 'user', email: 'user@email.com' };
      spyOn(authService, 'getProfile').and.returnValue(of({ data: profile }));

      actions$ = of(AuthActions.loadAuth());

      effects.loadAuths$.subscribe((action) => {
        expect(authService.getProfile).toHaveBeenCalled();
        expect(action).toEqual(
          AuthActions.loadAuthSuccess({
            name: profile.name,
            email: profile.email,
          }),
        );
        done();
      });
    });

    it('should call loadAuthFailure action when get profile failed', (done) => {
      spyOn(authService, 'getProfile').and.returnValue(
        throwError(() => new Error('Error')),
      );

      actions$ = of(AuthActions.loadAuth());

      effects.loadAuths$.subscribe((action) => {
        expect(authService.getProfile).toHaveBeenCalled();
        expect(action).toEqual(AuthActions.loadAuthFailure());
        done();
      });
    });

    it('should sign out and navigate to sign-in page when loadAuthFailure action is dispatched', (done) => {
      spyOn(authService, 'signOut');
      spyOn(router, 'navigateByUrl');

      actions$ = of(AuthActions.loadAuthFailure());

      effects.loadAuthFailure$.subscribe(() => {
        expect(authService.signOut).toHaveBeenCalled();
        expect(router.navigateByUrl).toHaveBeenCalledWith('/sign-in');
        done();
      });
    });
  });

  it('should sign out and navigate to sign-in page when signOut action is dispatched', (done) => {
    spyOn(authService, 'signOut');
    spyOn(router, 'navigateByUrl');

    actions$ = of(AuthActions.signOut());

    effects.signOut$.subscribe(() => {
      expect(authService.signOut).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith('/sign-in');
      done();
    });
  });
});
