import { Component, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllBooks,
  selectLoadingBooks,
} from '../../state/book/book.selectors';
import { BookList } from '../../components/book-list/book-list';
import { SearchInput } from '../../components/search-input/search-input';

@Component({
  selector: 'app-books',
  imports: [BookList, SearchInput],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  private store = inject(Store);

  readonly books = this.store.selectSignal(selectAllBooks);
  readonly loading = this.store.selectSignal(selectLoadingBooks);

  readonly searchTerm = signal('');

  readonly filteredBooks = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.books();
    }

    return this.books().filter(
      (book) =>
        book.name.toLowerCase().includes(term) ||
        book.isbn.toLocaleLowerCase().includes(term) ||
        book.publisher.toLowerCase().includes(term) ||
        book.authors.filter((author) => author.toLocaleLowerCase().includes(term)).length > 0
    );
  });

  onSearchTermChange(term: string) {
    this.searchTerm.set(term);
  }
}
