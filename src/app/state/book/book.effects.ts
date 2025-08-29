import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BookActions } from './book.actions';
import { BooksService } from '../../services/books/books.service';

@Injectable()
export class BookEffects {
  private actions$ = inject(Actions);
  private booksService = inject(BooksService);

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      exhaustMap(() => this.booksService.getBooks()
        .pipe(
          map(books => BookActions.setBooks({ data: books })),
          catchError((error) => {
            console.error('[loadBooks$]', error);
            return EMPTY
          })
        )
      )
    );
  });
}
