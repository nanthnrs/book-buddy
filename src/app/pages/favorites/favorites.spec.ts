import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Favorites } from './favorites';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectFavoriteBooks } from '../../state/book/book.selectors';
import { Book } from '../../core/models/book';
import { bookFeatureKey, initialBookState } from '../../state/book/book.reducer';
import { provideRouter } from '@angular/router';

describe('Favorites', () => {
  let component: Favorites;
  let fixture: ComponentFixture<Favorites>;
  let nativeElement: HTMLElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorites],
      providers: [
        provideMockStore({
          initialState: {
            [bookFeatureKey]: initialBookState
          }
        }),
        provideRouter([])
      ]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(Favorites);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
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

  it('should display no favorites message when there are no favorite books', () => {
    store.overrideSelector(selectFavoriteBooks, []);
    store.refreshState();
    fixture.detectChanges();

    const noFavoritesElement = nativeElement.querySelector('#no-favorites');
    expect(noFavoritesElement).toBeTruthy();
    expect(noFavoritesElement?.textContent).toContain('No favorite books found.');
  });
});
