import { Component, inject } from '@angular/core';
import { Book } from '../../core/models/book';
import { Store } from '@ngrx/store';
import { selectAllBooks, selectLoadingBooks } from '../../state/book/book.selectors';
import { BookActions } from '../../state/book/book.actions';
import { BookList } from "../../components/book-list/book-list";

@Component({
  selector: 'app-books',
  imports: [BookList],
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
