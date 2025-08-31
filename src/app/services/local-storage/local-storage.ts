import { inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private storage = inject(BROWSER_STORAGE);

  getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
