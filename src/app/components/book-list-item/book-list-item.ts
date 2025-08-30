import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../core/models/book';
import { Store } from '@ngrx/store';
import { BookActions } from '../../state/book/book.actions';
import { FavoriteButton } from "../favorite-button/favorite-button";

@Component({
  selector: 'app-book-list-item',
  imports: [RouterLink, FavoriteButton],
  templateUrl: './book-list-item.html',
  styleUrl: './book-list-item.css'
})
export class BookListItem {
  book = input.required<Book>();

  private store = inject(Store);

  toggleFavorite() {
    const book = this.book();
    this.store.dispatch(BookActions.setFavorite({
      id: book.id,
      isFavorite: !book.isFavorite
    }));
  }
}
