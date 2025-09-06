import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListItem } from './book-list-item';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  bookFeatureKey,
  initialBookState,
} from '../../state/book/book.reducer';
import { Book } from '../../core/models/book';
import { BookActions } from '../../state/book/book.actions';
import { provideRouter } from '@angular/router';

describe('BookListItem', () => {
  let component: BookListItem;
  let fixture: ComponentFixture<BookListItem>;
  let nativeElement: HTMLElement;
  let store: MockStore;

  let mockBook = {
    id: '1',
    name: 'Book 1',
    url: 'https://anapioficeandfire.com/api/books/1',
  } as Book;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListItem],
      providers: [
        provideMockStore({
          initialState: {
            [bookFeatureKey]: initialBookState,
          },
        }),
        provideRouter([]),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(BookListItem);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.componentRef.setInput('book', mockBook);
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('book list item', () => {
    it('should render book list item correctly when isFavorite is not defined', async () => {
      fixture.componentRef.setInput('book', {
        ...mockBook,
        name: 'Book 1',
        isFavorite: undefined,
      } as Book);
      await fixture.whenStable();

      const listItem = nativeElement.querySelector('li');
      const favoriteIcon = nativeElement.querySelector('li i.bi');

      expect(listItem?.textContent).toContain('Book 1');
      expect(favoriteIcon?.className).toEqual('bi bi-heart');
    });

    it('should render book list item correctly when isFavorite is false', async () => {
      fixture.componentRef.setInput('book', {
        ...mockBook,
        name: 'Book 2',
        isFavorite: false,
      } as Book);
      await fixture.whenStable();

      const listItem = nativeElement.querySelector('li');
      const favoriteIcon = nativeElement.querySelector('li i.bi');

      expect(listItem?.textContent).toContain('Book 2');
      expect(favoriteIcon?.className).toEqual('bi bi-heart');
    });

    it('should render book list item correctly when isFavorite is true', async () => {
      fixture.componentRef.setInput('book', {
        ...mockBook,
        name: 'Book 3',
        isFavorite: true,
      } as Book);
      await fixture.whenStable();

      const listItem = nativeElement.querySelector('li');
      const favoriteIcon = nativeElement.querySelector('li i.bi');

      expect(listItem?.textContent).toContain('Book 3');
      expect(favoriteIcon?.className).toEqual('bi bi-heart-fill text-red-500');
    });
  });

  describe('toggleFavorite', () => {
    beforeEach(() => {
      spyOn(component, 'toggleFavorite').and.callThrough();
      spyOn(store, 'dispatch').and.callThrough();
    });

    it('should toggle when favorite is not defined', async () => {
      fixture.componentRef.setInput('book', {
        ...mockBook,
        id: '123',
        isFavorite: undefined,
      } as Book);
      await fixture.whenStable();

      const favoriteButton = nativeElement.querySelector(
        'app-favorite-button button'
      ) as HTMLButtonElement;
      favoriteButton.click();

      expect(component.toggleFavorite).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        BookActions.setFavorite({ id: '123', isFavorite: true })
      );
    });

    it('should toggle when favorite is false', async () => {
      fixture.componentRef.setInput('book', {
        ...mockBook,
        id: '456',
        isFavorite: false,
      } as Book);
      await fixture.whenStable();

      const favoriteButton = nativeElement.querySelector(
        'app-favorite-button button'
      ) as HTMLButtonElement;
      favoriteButton.click();

      expect(component.toggleFavorite).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        BookActions.setFavorite({ id: '456', isFavorite: true })
      );
    });

    it('should toggle when favorite is true', async () => {
      fixture.componentRef.setInput('book', {
        ...mockBook,
        id: '789',
        isFavorite: true,
      } as Book);
      await fixture.whenStable();

      const favoriteButton = nativeElement.querySelector(
        'app-favorite-button button'
      ) as HTMLButtonElement;
      favoriteButton.click();

      expect(component.toggleFavorite).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(
        BookActions.setFavorite({ id: '789', isFavorite: false })
      );
    });
  });

  describe('navigation', () => {
    it('should have a routerLink to book detail page', () => {
      const anchor = nativeElement.querySelector('a');
      expect(anchor?.getAttribute('href')).toBe('/books/1');
    });
  });
});
