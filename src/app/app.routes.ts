import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'books',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/books/books').then((m) => m.Books),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/book-detail/book-detail').then((m) => m.BookDetail),
      },
    ],
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites').then((m) => m.Favorites),
  },
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'books',
  },
];
