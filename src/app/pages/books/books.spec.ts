import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Books } from './books';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { bookFeatureKey, initialBookState } from '../../state/book/book.reducer';
import { selectFavoriteBooks, selectLoadingBooks } from '../../state/book/book.selectors';
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
      ]
    })
      .compileComponents();

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
    store.overrideSelector(selectFavoriteBooks, [
      {
        name: 'Book 1',
        isFavorite: true,
        url: 'https://anapioficeandfire.com/api/books/1'
      }] as Book[]);
    store.refreshState();
    fixture.detectChanges();

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
  });
});
