import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { AppEffects } from './app.effects';
import { AppActions } from './app.actions';
import { AuthActions } from '../auth/auth.actions';
import { BookActions } from '../book/book.actions';

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        // @ts-ignore
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should map loadAppSecure to loadAuth action', (done) => {
    actions$ = of(AppActions.loadAppSecure());
    effects.loadAuth$.subscribe((action) => {
      expect(action).toEqual(AuthActions.loadAuth());
      done();
    });
  });

  it('should map loadAppSecure to loadBooks action', (done) => {
    actions$ = of(AppActions.loadAppSecure());
    effects.loadBooks$.subscribe((action) => {
      expect(action).toEqual(BookActions.loadBooks());
      done();
    });
  });
});
