import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../../core/models/book';

export const bookFeatureKey = 'book';

export interface BookState {
  books: Book[];
  loading: boolean;
  selected: Book | null;
}

export const initialBookState: BookState = {
  books: [],
  loading: false,
  selected: null,
};

export const bookReducer = createReducer(
  initialBookState,
  on(BookActions.loadBooks, (state) => ({
    ...state,
    loading: true,
  })),
  on(BookActions.setBooks, (state, { data }) => ({
    ...state,
    books: data,
    loading: false,
  })),
  on(BookActions.setFavorite, (state, { id, isFavorite }) => ({
    ...state,
    books: state.books.map(book => ({
      ...book,
      isFavorite: book.id === id ? isFavorite : book.isFavorite
    }))
  }))
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer: bookReducer,
});

