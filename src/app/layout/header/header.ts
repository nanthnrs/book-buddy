import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../../state/book/book.actions';
import { selectLoadingBooks } from '../../state/book/book.selectors';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  readonly store = inject(Store)
  readonly loading = this.store.selectSignal(selectLoadingBooks)

  refreshBooks() {
    this.store.dispatch(BookActions.loadBooks());
  }
}
