import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { BookEffects } from './book.effects';
import { provideHttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books/books.service';
import { Book } from '../../core/models/book';
import { BookActions } from './book.actions';

describe('BookEffects', () => {
  let actions$: Observable<any>;
  let effects: BookEffects;
  let booksService: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        // @ts-ignore
        provideMockActions(() => actions$),
        provideHttpClient()
      ]
    });

    effects = TestBed.inject(BookEffects);
    booksService = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadBooks$', () => {
    it('should load books and dispatch setBooks action', (done) => {
      const booksMock: Book[] = [
        { isbn: '123', name: 'Book 1', url: 'https://anapioficeandfire.com/api/books/1' },
        { isbn: '456', name: 'Book 2', url: 'https://anapioficeandfire.com/api/books/2' }
      ] as Book[];

      spyOn(booksService, 'getBooks').and
        .returnValue(of(booksMock));

      actions$ = of(BookActions.loadBooks());

      effects.loadBooks$.subscribe(action => {
        expect(action).toEqual(BookActions.setBooks({ data: booksMock }));
        done();
      });
    });

    it('should handle error when loading books failed', (done) => {
      const consoleSpy = spyOn(console, 'error');

      spyOn(booksService, 'getBooks').and
        .returnValue(throwError(() => new Error('Error loading books')));

      actions$ = of(BookActions.loadBooks());

      effects.loadBooks$.subscribe({
        next: () => {
          done.fail('Expected an error, but got a success response');
        },
        error: () => {
          done.fail('Expected the effect to handle the error internally');
        },
        complete: () => {
          expect(consoleSpy).toHaveBeenCalledWith('[loadBooks$]', new Error('Error loading books'));
          done();
        }
      });
    });
  });
});
