import { Routes } from '@angular/router';
import { Secure } from './layout/secure/secure';

export const routes: Routes = [
  {
    path: '',
    component: Secure,
    children: [
      {
        path: 'books',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/books/books').then((m) => m.Books),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/book-detail/book-detail').then(
                (m) => m.BookDetail
              ),
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
        pathMatch: 'full',
        redirectTo: 'books',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'books',
  },
];
