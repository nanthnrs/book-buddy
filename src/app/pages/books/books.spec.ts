import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { Books } from './books';
import { provideHttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books/books.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { Book } from '../../core/models/book';

const booksMock = [
  { name: 'Book 1', isFavorite: false },
  { name: 'Book 2', isFavorite: true },
  { name: 'Book 3', }
] as Book[];

describe('Books', () => {
  let component: Books;
  let fixture: ComponentFixture<Books>;
  let nativeElement: HTMLElement;
  let booksService: BooksService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Books],
      providers: [provideHttpClient(), provideRouter([])]
    })
      .compileComponents();

    booksService = TestBed.inject(BooksService);

    spyOn(booksService, 'getBooks').and.returnValue(of(booksMock));

    fixture = TestBed.createComponent(Books);
    nativeElement = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(booksService.getBooks).toHaveBeenCalledOnceWith();
    expect(component.books()).toEqual(booksMock);
  });

  it('should display list of books', () => {
    const listItems = nativeElement.querySelectorAll('#book-list li');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toContain('Book 1');
    expect(listItems[1].textContent).toContain('Book 2');
    expect(listItems[2].textContent).toContain('Book 3');
  });

  it('should display favorite icon correctly', () => {
    const favoriteIcons = nativeElement.querySelectorAll('#book-list li i.bi');
    expect(favoriteIcons.length).toBe(3);
    expect(favoriteIcons[0].className).toContain('bi bi-heart');
    expect(favoriteIcons[1].className).toContain('bi bi-heart-fill text-blue-500');
    expect(favoriteIcons[2].className).toContain('bi bi-heart');
  });

  describe('toggleFavorite', () => {
    it('should toggle the isFavorite property of a book', fakeAsync(() => {
      const book = { name: 'Book 1', isFavorite: false } as Book;
      expect(book.isFavorite).toBeFalse();

      component.toggleFavorite(book);
      expect(book.isFavorite).toBeTrue();

      component.toggleFavorite(book);
      expect(book.isFavorite).toBeFalse();
    }));
  });
});
