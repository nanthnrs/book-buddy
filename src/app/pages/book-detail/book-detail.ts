import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../core/models/book';
import { BooksService } from '../../services/books/books.service';
import { Store } from '@ngrx/store';
import { selectFavoriteBooks } from '../../state/book/book.selectors';
import { FavoriteButton } from '../../components/favorite-button/favorite-button';
import { BookActions } from '../../state/book/book.actions';
import { forkJoin, timer } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  imports: [FavoriteButton],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private booksService = inject(BooksService);
  private store = inject(Store);

  readonly book = signal<Book | null>(null);

  readonly favoriteBooks = this.store.selectSignal(selectFavoriteBooks);

  readonly isFavorite = computed(() => {
    const book = this.book();
    if (!book) {
      return false;
    }
    return this.favoriteBooks().some((b) => b.id === book.id);
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.getBook(id);
  }

  getBook(id: string) {
    return forkJoin([
      this.booksService.getBook(id),
      timer(1000), // Simulate loading time
    ]).subscribe(([book]) => {
      this.book.set(book);
    });
  }

  onFavoriteClick() {
    const book = this.book()!;
    this.store.dispatch(
      BookActions.setFavorite({
        id: book.id,
        isFavorite: !this.isFavorite(),
      })
    );
  }
}
