import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../core/models/book';
import { Store } from '@ngrx/store';
import { selectAllBooks, selectLoadingBooks } from '../../state/book/book.selectors';
import { BookActions } from '../../state/book/book.actions';

@Component({
  selector: 'app-books',
  imports: [RouterLink],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books {
  private store = inject(Store);

  readonly books = this.store.selectSignal(selectAllBooks);
  readonly loading = this.store.selectSignal(selectLoadingBooks);

  toggleFavorite(book: Book) {
    this.store.dispatch(BookActions.setFavorite({
      isbn: book.isbn,
      isFavorite: !book.isFavorite
    }));
  }
}
