import { Book } from '../../core/models/book';
import * as fromBook from './book.reducer';
import { selectAllBooks, selectBookState, selectLoadingBooks } from './book.selectors';

describe('Book Selectors', () => {
  const booksState: fromBook.BookState = {
    books: [
      { isbn: '123', name: 'Book 1' },
      { isbn: '456', name: 'Book 2' }
    ] as Book[],
    loading: false,
    selected: { isbn: '123', name: 'Book 1' } as Book,
    favorites: ['123']
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

  it('should select loading state', () => {
    const result = selectLoadingBooks.projector(booksState);
    expect(result).toBe(booksState.loading);
  });
});
