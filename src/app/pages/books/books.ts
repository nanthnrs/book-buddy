import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksService } from '../../services/books/books.service';
import { RouterLink } from '@angular/router';
import { Book } from '../../core/models/book';

@Component({
  selector: 'app-books',
  imports: [RouterLink],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books implements OnInit {
  private booksService = inject(BooksService);

  readonly books = signal<Book[]>([]);

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.books.set(books);
    });
  }

  toggleFavorite(book: Book) {
    book.isFavorite = !book.isFavorite;
  }
}
