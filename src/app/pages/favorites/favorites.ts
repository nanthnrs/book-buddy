import { Component, inject } from '@angular/core';
import { BookList } from "../../components/book-list/book-list";
import { Store } from '@ngrx/store';
import { selectFavoriteBooks } from '../../state/book/book.selectors';

@Component({
  selector: 'app-favorites',
  imports: [BookList],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites {
  private store = inject(Store);

  readonly books = this.store.selectSignal(selectFavoriteBooks);
}
