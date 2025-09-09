import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { AppActions } from './app.actions';
import { AuthActions } from '../auth/auth.actions';
import { BookActions } from '../book/book.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);

  loadAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadAppSecure),
      map(() => AuthActions.loadAuth()),
    );
  });

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadAppSecure),
      map(() => BookActions.loadBooks()),
    );
  });
}
