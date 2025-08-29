import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';

export const selectBookState = createFeatureSelector<fromBook.BookState>(
  fromBook.bookFeatureKey
);

export const selectAllBooks = createSelector(
  selectBookState,
  (state) => state.books
);

export const selectLoadingBooks = createSelector(
  selectBookState,
  (state) => state.loading
);
