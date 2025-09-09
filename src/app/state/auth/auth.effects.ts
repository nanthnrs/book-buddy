import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  loadAuths$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuth),
      exhaustMap(() =>
        this.authService.getProfile().pipe(
          map(({ data }) => AuthActions.loadAuthSuccess(data)),
          catchError(() => of(AuthActions.loadAuthFailure())),
        ),
      ),
    );
  });

  loadAuthFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loadAuthFailure),
        map(() => {
          this.authService.signOut();
          this.router.navigateByUrl('/sign-in');
        }),
      );
    },
    { dispatch: false },
  );

  signOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOut),
        map(() => {
          this.authService.signOut();
          this.router.navigateByUrl('/sign-in');
        }),
      );
    },
    { dispatch: false },
  );
}
