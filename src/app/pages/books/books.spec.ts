import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Books } from './books';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  bookFeatureKey,
  initialBookState,
} from '../../state/book/book.reducer';
import {
  selectAllBooks,
  selectFavoriteBooks,
  selectLoadingBooks,
} from '../../state/book/book.selectors';
import { Book } from '../../core/models/book';

describe('Books', () => {
  let component: Books;
  let fixture: ComponentFixture<Books>;
  let nativeElement: HTMLElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Books],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        provideMockStore({
          initialState: {
            [bookFeatureKey]: initialBookState,
          },
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(Books);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render book list component', () => {
    store.overrideSelector(selectLoadingBooks, false);
    store.overrideSelector(selectFavoriteBooks, [
      {
        name: 'Book 1',
        isFavorite: true,
        url: 'https://anapioficeandfire.com/api/books/1',
      },
    ] as Book[]);
    store.refreshState();
    fixture.detectChanges();

    const loadingElement = nativeElement.querySelector('#loading-books');
    expect(loadingElement).toBeFalsy();

    const bookListComponent = nativeElement.querySelector('app-book-list');
    expect(bookListComponent).toBeTruthy();
  });

  it('should display loading when books are loading', () => {
    store.overrideSelector(selectLoadingBooks, true);
    store.refreshState();
    fixture.detectChanges();

    const loadingElement = nativeElement.querySelector('#loading-books');
    expect(loadingElement).toBeTruthy();
    expect(loadingElement?.textContent).toContain('Loading...');

    const bookListComponent = nativeElement.querySelector('app-book-list');
    expect(bookListComponent).toBeFalsy();
  });

  it('should display filtered books when search input is used', async () => {
    store.overrideSelector(selectLoadingBooks, false);
    store.overrideSelector(selectAllBooks, [
      {
        name: 'Book 1',
        isbn: '012-345-678',
        publisher: 'Publisher 1',
        authors: ['Author 1', 'Author 2'],
      },
      {
        name: 'Another Book',
        isbn: '987-654-321',
        publisher: 'Publisher 2',
        authors: ['Author 3', 'Author 4'],
      },
      {
        name: 'Third Book',
        isbn: '555-666-777',
        publisher: 'Publisher 3',
        authors: ['Author 5', 'Author 6'],
      },
    ] as Book[]);
    store.refreshState();
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('app-search-input input');
    searchInput.value = 'another';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const listItems = nativeElement.querySelectorAll(
      '#book-list app-book-list-item'
    );
    expect(listItems.length).toBe(1);
    expect(listItems[0].textContent).toContain('Another Book');
  });

  it('should display all books when search input is cleared', async () => {
    store.overrideSelector(selectLoadingBooks, false);
    store.overrideSelector(selectAllBooks, [
      {
        name: 'Book 1',
        isbn: '012-345-678',
        publisher: 'Publisher 1',
        authors: ['Author 1', 'Author 2'],
      },
      {
        name: 'Another Book',
        isbn: '987-654-321',
        publisher: 'Publisher 2',
        authors: ['Author 3', 'Author 4'],
      },
      {
        name: 'Third Book',
        isbn: '555-666-777',
        publisher: 'Publisher 3',
        authors: ['Author 5', 'Author 6'],
      },
    ] as Book[]);
    store.refreshState();
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('app-search-input input');
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const listItems = nativeElement.querySelectorAll(
      '#book-list app-book-list-item'
    );
    expect(listItems.length).toBe(3);
  });

  it('should display no books found when search input does not match any book', async () => {
    store.overrideSelector(selectLoadingBooks, false);
    store.overrideSelector(selectAllBooks, [
      {
        name: 'Book 1',
        isbn: '012-345-678',
        publisher: 'Publisher 1',
        authors: ['Author 1', 'Author 2'],
      },
      {
        name: 'Another Book',
        isbn: '987-654-321',
        publisher: 'Publisher 2',
        authors: ['Author 3', 'Author 4'],
      },
      {
        name: 'Third Book',
        isbn: '555-666-777',
        publisher: 'Publisher 3',
        authors: ['Author 5', 'Author 6'],
      },
    ] as Book[]);
    store.refreshState();
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('app-search-input input');
    searchInput.value = 'nonexistent';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const listItems = nativeElement.querySelectorAll(
      '#book-list app-book-list-item'
    );
    expect(listItems.length).toBe(0);

    const notFoundEl = nativeElement.querySelector('#no-books-found') as HTMLParagraphElement;
    expect(notFoundEl).toBeTruthy();
    expect(notFoundEl.textContent).toContain('No books found.');
  });
});
