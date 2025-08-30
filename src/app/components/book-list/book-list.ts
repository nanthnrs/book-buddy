import { Component, inject, input } from '@angular/core';
import { Book } from '../../core/models/book';
import { RouterLink } from '@angular/router';
import { BookActions } from '../../state/book/book.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-book-list',
  imports: [RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  books = input.required<Book[]>();

  private store = inject(Store);

  toggleFavorite(book: Book) {
    this.store.dispatch(BookActions.setFavorite({
      isbn: book.isbn,
      isFavorite: !book.isFavorite
    }));
  }
}
