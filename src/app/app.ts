import { Component, inject, OnInit } from '@angular/core';
import { Header } from "./layout/header/header";
import { Navbar } from "./layout/navbar/navbar";
import { Main } from "./layout/main/main";
import { Footer } from "./layout/footer/footer";
import { Store } from '@ngrx/store';
import { BookActions } from './state/book/book.actions';

@Component({
  selector: 'app-root',
  imports: [Header, Navbar, Main, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private store = inject(Store)

  ngOnInit() {
    console.log('App initialized');
    this.store.dispatch(BookActions.loadBooks());
  }
}
