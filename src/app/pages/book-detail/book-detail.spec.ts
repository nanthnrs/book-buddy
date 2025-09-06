import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetail } from './book-detail';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialBookState } from '../../state/book/book.reducer';
import { BooksService } from '../../services/books/books.service';
import { of } from 'rxjs';
import { Book } from '../../core/models/book';
import { selectFavoriteBooks } from '../../state/book/book.selectors';
import { BookActions } from '../../state/book/book.actions';

describe('BookDetail', () => {
  let component: BookDetail;
  let fixture: ComponentFixture<BookDetail>;
  let booksService: BooksService;
  let nativeElement: HTMLElement;
  let store: MockStore;

  const mockBook = {
    id: '1',
    name: 'Book 1',
    url: 'https://anapioficeandfire.com/api/books/1',
    authors: ['Author 1', 'Author 2'],
    numberOfPages: 123,
    mediaType: 'Hardcover',
    released: '2020-01-01',
    isbn: '123-456-789',
    publisher: 'Publisher 1',
    country: 'Country 1',
  } as Book;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookDetail],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideMockStore({
          initialState: initialBookState,
        }),
      ],
    }).compileComponents();

    booksService = TestBed.inject(BooksService);
    spyOn(booksService, 'getBook').and.returnValue(of(mockBook));

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(BookDetail);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render book detail correctly', async () => {
    store.overrideSelector(selectFavoriteBooks, []);
    store.refreshState();

    await fixture.whenStable();

    fixture.detectChanges();

    const title = nativeElement.querySelector('h1');
    expect(title?.textContent).toBe(mockBook.name);

    const table = nativeElement.querySelector('table');
    expect(table).toBeTruthy();

    const rows = table?.querySelectorAll('tr');
    expect(rows?.length).toBe(8);

    const nameRow = rows?.[0];
    const nameLabel = nameRow?.querySelector('th');
    const nameValue = nameRow?.querySelector('td');
    expect(nameLabel?.textContent).toBe('Name');
    expect(nameValue?.textContent).toBe(mockBook.name);

    const isbnRow = rows?.[1];
    const isbnLabel = isbnRow?.querySelector('th');
    const isbnValue = isbnRow?.querySelector('td');
    expect(isbnLabel?.textContent).toBe('ISBN');
    expect(isbnValue?.textContent).toBe(mockBook.isbn);

    const authorsRow = rows?.[2];
    const authorsLabel = authorsRow?.querySelector('th');
    const authorsValues = authorsRow?.querySelectorAll('td ul li');
    expect(authorsLabel?.textContent).toBe('Authors');
    expect(authorsValues?.length).toBe(mockBook.authors.length);
    expect(authorsValues?.[0].textContent).toBe(mockBook.authors[0]);
    expect(authorsValues?.[1].textContent).toBe(mockBook.authors[1]);

    const publisherRow = rows?.[3];
    const publisherLabel = publisherRow?.querySelector('th');
    const publisherValue = publisherRow?.querySelector('td');
    expect(publisherLabel?.textContent).toBe('Publisher');
    expect(publisherValue?.textContent).toBe(mockBook.publisher);

    const releasedRow = rows?.[4];
    const releasedLabel = releasedRow?.querySelector('th');
    const releasedValue = releasedRow?.querySelector('td');
    expect(releasedLabel?.textContent).toBe('Released');
    expect(releasedValue?.textContent).toBe(mockBook.released);

    const numberOfPagesRow = rows?.[5];
    const numberOfPagesLabel = numberOfPagesRow?.querySelector('th');
    const numberOfPagesValue = numberOfPagesRow?.querySelector('td');
    expect(numberOfPagesLabel?.textContent).toBe('Number of pages');
    expect(numberOfPagesValue?.textContent?.trim()).toBe(
      `${mockBook.numberOfPages}`
    );

    const mediaTypeRow = rows?.[6];
    const mediaTypeLabel = mediaTypeRow?.querySelector('th');
    const mediaTypeValue = mediaTypeRow?.querySelector('td');
    expect(mediaTypeLabel?.textContent).toBe('Media type');
    expect(mediaTypeValue?.textContent).toBe(mockBook.mediaType);

    const countryRow = rows?.[7];
    const countryLabel = countryRow?.querySelector('th');
    const countryValue = countryRow?.querySelector('td');
    expect(countryLabel?.textContent).toBe('Country');
    expect(countryValue?.textContent).toBe(mockBook.country);
  });

  it('should render favorite button correctly when the book is not favorite', async () => {
    store.overrideSelector(selectFavoriteBooks, []);
    store.refreshState();

    await fixture.whenStable();

    fixture.detectChanges();

    const button = nativeElement.querySelector('app-favorite-button button');
    expect(button).toBeTruthy();

    const icon = button?.querySelector('i.bi');
    expect(icon).toBeTruthy();
    expect(icon?.className).toBe('bi bi-heart');
  });

  it('should render favorite button correctly when the book is favorite', async () => {
    store.overrideSelector(selectFavoriteBooks, [mockBook]);
    store.refreshState();

    await fixture.whenStable();

    fixture.detectChanges();

    const button = nativeElement.querySelector('app-favorite-button button');
    expect(button).toBeTruthy();

    const icon = button?.querySelector('i.bi');
    expect(icon).toBeTruthy();
    expect(icon?.className).toBe('bi bi-heart-fill text-red-500');
  });

  it('should dispatch setFavorite action when favorite button is clicked', async () => {
    store.overrideSelector(selectFavoriteBooks, []);
    store.refreshState();

    spyOn(store, 'dispatch').and.callThrough();

    await fixture.whenStable();

    fixture.detectChanges();

    const button = nativeElement.querySelector('app-favorite-button button') as HTMLButtonElement;
    expect(button).toBeTruthy();

    button.click();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      BookActions.setFavorite({ id: mockBook.id, isFavorite: true })
    );
  });
});
