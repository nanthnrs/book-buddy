import { Component, inject, OnInit } from '@angular/core';
import { Header } from './header/header';
import { Navbar } from './navbar/navbar';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { Store } from '@ngrx/store';
import { BookActions } from '../../state/book/book.actions';

@Component({
  selector: 'app-secure',
  imports: [Header, Navbar, Main, Footer],
  templateUrl: './secure.html',
  styleUrl: './secure.css',
})
export class Secure implements OnInit {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(BookActions.loadBooks());
  }
}
