import { BookActions } from './book.actions';
import { bookReducer, initialBookState } from './book.reducer';

describe('Book Reducer', () => {
  describe('an unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const result = bookReducer(initialBookState, action);

      expect(result).toBe(initialBookState);
    });
  });

  describe('loadBooks action', () => {
    it('should set loading to true', () => {
      const action = BookActions.loadBooks();
      const result = bookReducer(initialBookState, action);

      expect(result).toEqual({
        ...initialBookState,
        loading: true
      });
    });
  });

  describe('setBooks action', () => {
    it('should set books and loading to false', () => {
      const booksMock = [
        { isbn: '123', name: 'Book 1' },
        { isbn: '456', name: 'Book 2' }
      ] as any[];

      const action = BookActions.setBooks({ data: booksMock });
      const result = bookReducer(
        { ...initialBookState, loading: true },
        action
      );

      expect(result).toEqual({
        ...initialBookState,
        books: booksMock,
        loading: false
      });
    });
  });
});
