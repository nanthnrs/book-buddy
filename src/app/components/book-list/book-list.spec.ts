import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookList } from './book-list';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { bookFeatureKey, initialBookState } from '../../state/book/book.reducer';
import { Book } from '../../core/models/book';
import { BookActions } from '../../state/book/book.actions';

const mockBooks = [
  { name: 'Book 1', isFavorite: false },
  { name: 'Book 2', isFavorite: true },
  { name: 'Book 3', }
] as Book[];

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;
  let nativeElement: HTMLElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookList],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            [bookFeatureKey]: initialBookState
          }
        })
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(BookList);
    fixture.componentRef.setInput('books', mockBooks);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of books', async () => {
    const listItems = nativeElement.querySelectorAll('#book-list li');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toContain('Book 1');
    expect(listItems[1].textContent).toContain('Book 2');
    expect(listItems[2].textContent).toContain('Book 3');

    const favoriteIcons = nativeElement.querySelectorAll('#book-list li i.bi');
    expect(favoriteIcons.length).toBe(3);
    expect(favoriteIcons[0].className).toContain('bi bi-heart');
    expect(favoriteIcons[1].className).toContain('bi bi-heart-fill text-blue-500');
    expect(favoriteIcons[2].className).toContain('bi bi-heart');
  });

  describe('toggleFavorite', () => {
    it('should toggle the isFavorite property of a book', () => {
      const book1 = { isbn: '123', isFavorite: undefined } as Book;
      const book2 = { isbn: '456', isFavorite: false } as Book;
      const book3 = { isbn: '789', isFavorite: true } as Book;

      const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

      component.toggleFavorite(book1);
      expect(dispatchSpy).toHaveBeenCalledWith(BookActions.setFavorite({ isbn: book1.isbn, isFavorite: true }));

      component.toggleFavorite(book2);
      expect(dispatchSpy).toHaveBeenCalledWith(BookActions.setFavorite({ isbn: book2.isbn, isFavorite: true }));

      component.toggleFavorite(book3);
      expect(dispatchSpy).toHaveBeenCalledWith(BookActions.setFavorite({ isbn: book3.isbn, isFavorite: false }));
    });
  });
});
