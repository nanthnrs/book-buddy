import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { bookFeature } from './state/book/book.reducer';
import { BookEffects } from './state/book/book.effects';
import { authFeature } from './state/auth/auth.reducer';
import { AuthEffects } from './state/auth/auth.effects';
import { AppEffects } from './state/app/app.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(authFeature),
    provideState(bookFeature),
    provideEffects(AppEffects, AuthEffects, BookEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
