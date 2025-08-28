import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    loadComponent: () => import('./pages/books/books').then(m => m.Books)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./pages/favorites/favorites').then(m => m.Favorites)
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'books'
  }
];
