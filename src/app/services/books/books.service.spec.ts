import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('BooksService', () => {
  let service: BooksService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(BooksService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books', (done: DoneFn) => {
    spyOn(httpClient, 'get').and.returnValue(
      of([
        { name: 'Book 1', url: 'https://anapioficeandfire.com/api/books/1' },
        { name: 'Book 2', url: 'https://anapioficeandfire.com/api/books/2' }
      ])
    );

    service.getBooks().subscribe((books) => {
      expect(httpClient.get).toHaveBeenCalledWith(
        `${environment.baseApiUrl}/books`
      );
      expect(books.length).toBe(2);
      expect(books[0].id).toBe('1');
      expect(books[0].name).toBe('Book 1');
      expect(books[1].id).toBe('2');
      expect(books[1].name).toBe('Book 2');
      done();
    });
  });
});
