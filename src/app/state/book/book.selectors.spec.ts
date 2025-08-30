import { Book } from '../../core/models/book';
import * as fromBook from './book.reducer';
import { selectAllBooks, selectBookState, selectFavoriteBooks, selectLoadingBooks } from './book.selectors';

describe('Book Selectors', () => {
  const booksState: fromBook.BookState = {
    books: [
      { isbn: '123', name: 'Book 1', isFavorite: undefined },
      { isbn: '456', name: 'Book 2', isFavorite: false },
      { isbn: '789', name: 'Book 3', isFavorite: true }
    ] as Book[],
    loading: false,
    selected: { isbn: '123', name: 'Book 1' } as Book,
  }

  it('should select the feature state', () => {
    const result = selectBookState({
      [fromBook.bookFeatureKey]: booksState
    });
    expect(result).toEqual(booksState);
  });

  it('should select all books', () => {
    const result = selectAllBooks.projector(booksState);
    expect(result).toEqual(booksState.books);
  });

  it('should select favorite books', () => {
    const result = selectFavoriteBooks.projector(booksState);
    expect(result.length).toBe(1);
    expect(result).toEqual([booksState.books[2]]);
  });

  it('should select loading state', () => {
    const result = selectLoadingBooks.projector(booksState);
    expect(result).toBe(booksState.loading);
  });
});
