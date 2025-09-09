import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  loadAuths$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadAuth),
      exhaustMap(() =>
        this.authService.getProfile().pipe(
          map(({ data }) => AuthActions.setAuth(data)),
          catchError(() => of(AuthActions.clearAuth())),
        ),
      ),
    );
  });
}
