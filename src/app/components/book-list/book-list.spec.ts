import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookList } from './book-list';
import { Book } from '../../core/models/book';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

const mockBooks = [
  { name: 'Book 1', isFavorite: false, url: 'https://anapioficeandfire.com/api/books/1' },
  { name: 'Book 2', isFavorite: true, url: 'https://anapioficeandfire.com/api/books/2' },
  { name: 'Book 3', url: 'https://anapioficeandfire.com/api/books/3' }
] as Book[];

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookList],
      providers: [
        provideMockStore({}),
        provideRouter([])
      ]
    })
      .compileComponents();

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
    const listItems = nativeElement.querySelectorAll('#book-list app-book-list-item');
    expect(listItems.length).toBe(3);
  });

  it('should display not found text when book list is empty', async () => {
    fixture.componentRef.setInput('books', []);
    fixture.componentRef.setInput('notFoundText', 'No books found.');
    fixture.detectChanges();
    const notFoundEl = nativeElement.querySelector('#no-books-found') as HTMLParagraphElement;
    expect(notFoundEl).toBeTruthy();
    expect(notFoundEl.textContent).toContain('No books found.');
  });
});
