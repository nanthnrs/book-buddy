import { Component, input } from '@angular/core';
import { Book } from '../../core/models/book';
import { BookListItem } from "../book-list-item/book-list-item";

@Component({
  selector: 'app-book-list',
  imports: [BookListItem],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  books = input.required<Book[]>();
}
