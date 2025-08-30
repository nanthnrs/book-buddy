import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Book } from '../../core/models/book';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private readonly baseUrl = environment.baseApiUrl;

  private http = inject(HttpClient);

  getBooks() {
    return this.http.get<Book[]>(`${this.baseUrl}/books`)
      .pipe(
        map((books) => books.map((book) => ({
          ...book,
          id: book.url.split('/').pop() ?? '',
        })))
      );
  }
}
